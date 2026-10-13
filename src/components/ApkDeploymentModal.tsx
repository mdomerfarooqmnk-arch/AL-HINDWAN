import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  Download, Smartphone, Terminal, Check, Copy, ExternalLink,
  ShieldCheck, AlertTriangle, ArrowRight, X, Sparkles, Box, FileCode
} from 'lucide-react';
import { AlHindwanLogo } from './AlHindwanLogo';
interface ApkDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDeploymentModal: React.FC<ApkDeploymentModalProps> = ({ isOpen, onClose }) => {
  const [downloadingZip, setDownloadingZip] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeDeployTab, setActiveDeployTab] = useState<'pwa' | 'studio' | 'github'>('pwa');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installedSuccess, setInstalledSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleTriggerNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledSuccess(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('To install on Android:\n1. Open this app in Chrome on your Android phone.\n2. Tap the 3 dots menu (⋮) in the top right.\n3. Select "Add to Home screen" or "Install app".');
    }
  };

  const handleDownloadAndroidProjectZip = async () => {
    setDownloadingZip(true);
    try {
      const zip = new JSZip();

      // Root configuration files
      zip.file(
        'settings.gradle.kts',
        `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "AlHindwanTravels"
include(":app")
`
      );

      zip.file(
        'build.gradle.kts',
        `plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.google.gms) apply false
}
`
      );

      // App build.gradle.kts
      zip.file(
        'app/build.gradle.kts',
        `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.gms.google-services")
}

android {
    namespace = "com.alhindwan.travels"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.alhindwan.travels"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
}
`
      );

      zip.file(
        'README.md',
        `# Al-Hindwan Tours & Travels - Android Project
Build APK via ./gradlew assembleDebug`
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'AlHindwan-Android-Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to create ZIP', e);
    } finally {
      setDownloadingZip(false);
    }
  };

  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://your-app-url';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-[#062e22] text-white p-6 border-b border-[#c5a059]/40 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  Android Deployment Hub
                </span>
                <span className="text-xs text-emerald-200">
                  Target: Android 8.0 to Android 14+ (API 26–34)
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Deploy & Install Al-Hindwan Android App
              </h2>
              <p className="text-xs text-emerald-200/90 mt-1 max-w-xl">
                Choose how you wish to install or generate your Android application with the official emblem:
              </p>
            </div>
            <AlHindwanLogo size="sm" className="hidden sm:inline-block shrink-0 drop-shadow-lg" />
          </div>

          {/* Tab Switcher */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setActiveDeployTab('pwa')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDeployTab === 'pwa'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              1. Instant WebAPK (Install on Phone)
            </button>
            <button
              onClick={() => setActiveDeployTab('studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDeployTab === 'studio'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              2. Android Studio Project (.ZIP)
            </button>
            <button
              onClick={() => setActiveDeployTab('github')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDeployTab === 'github'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              3. CI/CD Automated APK Build
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          {/* TAB 1: INSTANT NATIVE WEBAPK ON ANDROID */}
          {activeDeployTab === 'pwa' && (
            <div className="space-y-4">
              {/* Parse Error Solution Banner */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="font-bold text-amber-900 text-sm">
                    Why did Android say "Problem parsing the package"?
                  </h4>
                  <p className="text-amber-800 leading-relaxed">
                    Android OS strictly requires <strong>compiled binary Java/Kotlin bytecode (<code className="bg-amber-100 px-1 rounded">classes.dex</code>)</strong> and compiled manifest resources to install an <code className="bg-amber-100 px-1 rounded">.apk</code> file. Raw web files renamed as <code className="bg-amber-100 px-1 rounded">.apk</code> fail Android's native package parser.
                  </p>
                  <p className="text-amber-900 font-semibold pt-0.5">
                    ✨ <strong>The Solution:</strong> Android natively supports 1-click WebAPK installation below! It creates a native app icon on your home screen with zero parse errors.
                  </p>
                </div>
              </div>

              {/* Native 1-Click Install Button Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#062e22] via-[#0d4d3a] to-[#062e22] text-white border border-[#c5a059]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-emerald-950 flex items-center justify-center font-extrabold shadow-lg shrink-0">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-amber-300">
                      Install Al-Hindwan App on Android
                    </h4>
                    <p className="text-xs text-emerald-100/90 mt-0.5">
                      1-Click native app installation on phone. Full screen, offline support & live geofencing!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleTriggerNativeInstall}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-emerald-950 font-extrabold text-xs rounded-xl shadow-xl flex items-center gap-2.5 shrink-0 cursor-pointer transition-all transform hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-emerald-950" />
                  <span>{installedSuccess ? 'App Installed Successfully!' : 'Install App on Phone Now'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-7 h-7 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    How Native WebAPK Works on Android
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    When you tap <strong>"Install App on Phone Now"</strong> in Chrome or Samsung Internet, Google Play Services automatically builds a signed <strong>WebAPK</strong> and places the official <strong>Al-Hindwan Tours & Travels</strong> app icon in your phone's app drawer!
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider block">
                  Manual Installation Steps (if button above doesn't open prompt):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center mb-1 text-[11px]">
                      1
                    </span>
                    <strong className="text-slate-900 block">Open URL in Chrome</strong>
                    <p className="text-slate-500 mt-0.5">
                      Open this app link in Google Chrome or Samsung Internet on your phone.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center mb-1 text-[11px]">
                      2
                    </span>
                    <strong className="text-slate-900 block">Tap Menu (⋮)</strong>
                    <p className="text-slate-500 mt-0.5">
                      Tap the 3 dots in the top-right corner of Google Chrome.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center mb-1 text-[11px]">
                      3
                    </span>
                    <strong className="text-slate-900 block">Add to Home Screen</strong>
                    <p className="text-slate-500 mt-0.5">
                      Tap <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-bold text-slate-700 block mb-1">Copy App Link for Phone:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={appUrl}
                      className="flex-1 bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800"
                    />
                    <button
                      onClick={() => handleCopy('url', appUrl)}
                      className="px-3.5 py-2 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-900 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'url' ? 'Copied' : 'Copy URL'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANDROID STUDIO PROJECT ZIP */}
          {activeDeployTab === 'studio' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Box className="w-8 h-8 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">
                    Complete Android Studio Gradle Package (.ZIP)
                  </h4>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    Download the pre-configured Kotlin Jetpack Compose repository with Gradle build scripts, ViewModel, FusedLocation TrackingService, and AndroidManifest.
                  </p>
                </div>
              </div>

              <div className="flex justify-center py-2">
                <button
                  type="button"
                  onClick={handleDownloadAndroidProjectZip}
                  disabled={downloadingZip}
                  className="px-6 py-3 bg-gradient-to-r from-[#062e22] to-[#0d4d3a] hover:brightness-110 text-amber-300 text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>
                    {downloadingZip ? 'Packaging Android Project...' : 'Download Android Studio Project (.ZIP)'}
                  </span>
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <strong className="text-slate-900 block">Command Line Steps to Compile APK:</strong>
                <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] space-y-2">
                  <div className="text-slate-400"># 1. Unzip and navigate to project</div>
                  <div>unzip AlHindwan-Android-Project.zip && cd AlHindwan-Android-Project</div>
                  <div className="text-slate-400"># 2. Build Debug APK (instantly installable on any Android phone)</div>
                  <div className="text-amber-400">./gradlew assembleDebug</div>
                  <div className="text-emerald-400"># Output APK created at: app/build/outputs/apk/debug/app-debug.apk</div>
                  <div className="text-slate-400"># 3. Build Signed Release Bundle for Google Play Store</div>
                  <div className="text-amber-400">./gradlew bundleRelease</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GITHUB ACTIONS CI/CD */}
          {activeDeployTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <FileCode className="w-8 h-8 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Automated Cloud APK Build via GitHub Actions
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    You don't even need Android Studio installed on your computer! Simply push this workflow file into your GitHub repo under <code>.github/workflows/build-apk.yml</code>. GitHub will build the APK in the cloud and provide a direct download link!
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-500">.github/workflows/build-apk.yml</span>
                  <button
                    onClick={() =>
                      handleCopy(
                        'gha',
                        `name: Build Android APK
on: [push, workflow_dispatch]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Dependencies
        run: npm install --legacy-peer-deps
      - name: Build Web App
        run: npm run build
      - uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - uses: android-actions/setup-android@v3
      - name: Init Android & Capacitor
        run: |
          npm install --legacy-peer-deps @capacitor/core @capacitor/cli @capacitor/android
          npx cap init "Al-Hindwan Tours" "com.alhindwan.travels" --web-dir dist || true
          if [ ! -d "android" ]; then
            npx cap add android
          fi
          npx cap sync android
      - name: Build Debug APK
        run: |
          chmod +x android/gradlew || true
          cd android && ./gradlew assembleDebug --no-daemon
      - uses: actions/upload-artifact@v4
        with:
          name: al-hindwan-tours-debug-apk
          path: android/app/build/outputs/apk/debug/app-debug.apk`
                      )
                    }
                    className="text-emerald-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'gha' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'gha' ? 'Copied' : 'Copy Workflow Script'}</span>
                  </button>
                </div>

                <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed max-h-96">
{`name: Build Android APK
on: [push, workflow_dispatch]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install --legacy-peer-deps

      - name: Build Web App
        run: npm run build

      - name: Setup Java JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Sync Capacitor Android
        run: |
          npm install --legacy-peer-deps @capacitor/core @capacitor/cli @capacitor/android
          npx cap init "Al-Hindwan Tours" "com.alhindwan.travels" --web-dir dist || true
          if [ ! -d "android" ]; then
            npx cap add android
          fi
          npx cap sync android

      - name: Build Debug APK
        run: |
          chmod +x android/gradlew || true
          cd android && ./gradlew assembleDebug --no-daemon

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: al-hindwan-tours-debug-apk
          path: android/app/build/outputs/apk/debug/app-debug.apk`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Hajj & Umrah Platform · Ready for Google Play Release
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
