import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function createAlHindwanAppIcon(size) {
  const width = size;
  const height = size;
  const rowLength = width * 4;
  const rawData = Buffer.alloc(height * (rowLength + 1));

  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.44;
  const ry = height * 0.44;

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter type 0
    for (let x = 0; x < width; x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const distSq = dx * dx + dy * dy;

      // Outer background is deep emerald green (#062e22)
      let r = 6;
      let g = 46;
      let b = 34;

      if (distSq <= 1.0) {
        // Inside the main badge
        if (distSq >= 0.88) {
          // Gold border (#e5be6b)
          r = 229;
          g = 190;
          b = 107;
        } else if (distSq >= 0.84) {
          // Inner gold accent line
          r = 180;
          g = 140;
          b = 60;
        } else {
          // Deep charcoal black badge core (#0e0f12)
          r = 14;
          g = 15;
          b = 18;

          // Upper emblem zone (Airplane and Orbit)
          // Airplane coordinates
          const ax = x - cx;
          const ay = y - (cy - size * 0.12);

          // Orbit elliptical ring
          const rotAngle = -0.45; // ~ -26 deg
          const ox = ax * Math.cos(rotAngle) - ay * Math.sin(rotAngle);
          const oy = ax * Math.sin(rotAngle) + ay * Math.cos(rotAngle);
          const orbitDist = (ox * ox) / Math.pow(size * 0.28, 2) + (oy * oy) / Math.pow(size * 0.1, 2);

          const inOrbit = Math.abs(orbitDist - 1.0) < 0.14;

          // Airplane silhouette
          const px = ax + size * 0.05;
          const py = ay + size * 0.02;
          const inFuselage = Math.abs(px) < size * 0.035 && Math.abs(py) < size * 0.14;
          const inWings = Math.abs(py) < size * 0.035 && Math.abs(px) < size * 0.16;
          const inTail = Math.abs(py - size * 0.1) < size * 0.025 && Math.abs(px) < size * 0.08;

          // Lettering band for "AL-HINDWAN"
          const inTextZone = (y > cy + size * 0.1) && (y < cy + size * 0.22) && (Math.abs(x - cx) < size * 0.36);
          // Lettering band for "TOURS & TRAVELS"
          const inSubTextZone = (y > cy + size * 0.24) && (y < cy + size * 0.32) && (Math.abs(x - cx) < size * 0.32);

          if (inFuselage || inWings || inTail || inOrbit) {
            // Gold emblem (#f4d385)
            r = 244;
            g = 211;
            b = 133;
          } else if (inTextZone || inSubTextZone) {
            // Gold typography (#dfb75f)
            r = 223;
            g = 183;
            b = 95;
          }
        }
      }

      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = 255;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(calcCRC(crcData), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function calcCRC(buf) {
  let c = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = crcTable[(c ^ buf[n]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), createAlHindwanAppIcon(192));
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), createAlHindwanAppIcon(512));
fs.writeFileSync(path.join(publicDir, 'icon-maskable-512.png'), createAlHindwanAppIcon(512));

console.log('Official Al-Hindwan Tours & Travels app icons generated successfully in public/');
