const https = require('https');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Complete title-specific photographic mapping for all 70 backlog articles
const PHOTO_MAP = {
  // Batch 1
  'zero-trust-mobile-architecture-endpoint-isolation': 'photo-1550751827-4bd374c3f58b', // Cyber shield & encrypted lock
  'silicon-carbon-anode-batteries-mobile-density-revolution': 'photo-1585338107529-13afc5f02586', // Battery cell & circuits
  'unlocking-hidden-developer-options-android-performance-guide': 'photo-1555066931-4365d14bab8c', // Developer code & settings
  'spotify-vs-apple-music-vs-tidal-lossless-pricing-comparison': 'photo-1511671782779-c97d3d27a1d4', // Studio headphones & phone
  'backbone-one-gen-2-vs-razer-kishi-ultra-controller-showdown': 'photo-1600080972464-8e5f35f63d08', // Mobile controller gaming
  'no-nonsense-guide-extending-phone-battery-international-travel': 'photo-1488646953014-85cb44e25828', // Travel passport, phone & battery
  'state-of-mobile-gaming-2025-gpu-benchmarks-report': 'photo-1511512578047-dfb367046420', // RGB gaming setup
  'hardware-security-keys-mobile-fido2-yubikey-guide': 'photo-1614064641938-3bbee52942c7', // Hardware key & lock
  'precision-color-grading-tablets-custom-3d-luts-rec709': 'photo-1574717024653-61fd2cf4d44d', // Video color grading monitor
  'mastering-ios-focus-filters-dynamic-lock-screens-automations': 'photo-1510557880182-3d4d3cba35a5', // iPhone lock screen display

  // Batch 2
  'password-manager-economics-1password-bitwarden-proton-pass': 'photo-1563986768609-322da13575f3', // Password manager vault lock
  'calibrating-high-refresh-rate-displays-mobile-fps-games': 'photo-1542751371-adc38448a05e', // Fast mobile FPS game
  'what-major-os-updates-actually-change-practical-settings-guide': 'photo-1511707171634-5f897ff02aa9', // Smartphone OS update in hand
  'cross-platform-ecosystem-synchronization-handoff-benchmarks': 'photo-1519389950473-47ba0277781c', // Cross-device Mac & phone
  'davinci-resolve-ipados-vs-final-cut-pro-editing-review': 'photo-1574717024653-61fd2cf4d44d', // Video editing suite
  'next-wave-generative-mobile-video-beta-analysis': 'photo-1579783900882-c0d3dad7b119', // Generative AI visual art
  'ai-mobile-browsers-arc-search-opera-one-brave-leo': 'photo-1551288049-bebda4e38f71', // Mobile browsing interface
  'modern-vector-illustration-apps-mobile-beta-teardown': 'photo-1628155930542-3c7a64e2c833', // Vector art on tablet
  'encrypted-cloud-storage-teardown-proton-drive-cryptomator-tresorit': 'photo-1597872200969-2b65d56bd16b', // External SSD & encrypted drive
  'android-system-intelligence-google-play-telemetry-packet-audit': 'photo-1526374965328-7f61d4dc18c5', // Network packet terminal

  // Batch 3
  'procreate-vs-clip-studio-paint-tablet-stylus-teardown': 'photo-1544716278-ca5e3f4abd8c', // Procreate Apple Pencil drawing
  'eliminating-targeted-advertising-ids-mobile-privacy-hardening': 'photo-1510511459019-5dda7724fd87', // Privacy lock & cryptography
  'next-gen-local-file-sharing-cross-platform-airdrop-competitors': 'photo-1556656793-08538906a9f8', // Two phones wireless sharing
  'youtube-premium-vs-ad-blocking-mobile-browsers-value-breakdown': 'photo-1611162617213-7d7a39e9b1d7', // Streaming video playback
  'physical-grips-vs-touchscreen-finger-sleeves-mobile-gaming-ergonomics': 'photo-1550745165-9bc0b252726f', // Gaming controller ergonomics
  'practical-smartphone-refresh-rate-settings-120hz-battery-balance': 'photo-1580910051074-3eb694886505', // 120Hz flagship OLED display
  'mobile-web-rendering-report-webkit-vs-chromium-benchmarks': 'photo-1461749280684-dccba630e2f6', // Web engine code and browser
  'mobile-sandboxing-permissions-hardening-data-leaks-guide': 'photo-1526374965328-7f61d4dc18c5', // App sandboxing security
  'ultra-fast-gan-charging-vs-battery-longevity-thermal-audit': 'photo-1583863788434-e58a36330cf0', // GaN fast charger brick & cable
  'external-ssd-production-workflows-usb-c-tablets-dit-storage': 'photo-1597872200969-2b65d56bd16b', // External SSD connected to tablet

  // Batch 4
  'setting-up-android-private-space-complete-isolation-guide': 'photo-1512499617640-c74ae3a79d37', // Secure private phone on desk
  'autonomous-on-device-ai-agents-mobile-assistants-future': 'photo-1618005182384-a83a8bd57fbe', // Autonomous AI luminous graphics
  'cloud-storage-price-performance-audit-icloud-google-one-microsoft-365': 'photo-1544197150-b99a580bb7a8', // Cloud server infrastructure
  'native-console-ports-smartphones-thermal-throttling-analysis': 'photo-1542751371-adc38448a05e', // AAA console game on mobile
  'straightforward-storage-reclamation-safely-clearing-cache-bloat': 'photo-1598327105666-5b89351aff97', // Clearing phone memory cache
  'flagship-vs-modern-mid-range-smartphones-performance-audit': 'photo-1565849904461-04a58ad377e0', // Two smartphones compared
  'encrypted-knowledge-graphs-obsidian-mobile-sync-vs-logseq': 'photo-1557804506-669a67965ba0', // Connected knowledge network map
  'on-device-llm-inference-mobile-npu-power-efficiency-benchmarks': 'photo-1518770660439-4636190af475', // Silicon microchip processor die
  'vector-design-touchscreens-affinity-designer-vs-adobe-illustrator-ipad': 'photo-1581291518857-4e27b48ff24e', // Graphic designer drawing vector
  'hidden-camera-settings-raw-shutter-lag-optical-stabilization-guide': 'photo-1516035069371-29a1b244cc32', // Camera lens optical elements

  // Batch 5
  'computational-photography-beta-teardown-multi-frame-neural-processing': 'photo-1512790182412-b19e6d62bc39', // Camera multi-lens shutter
  'task-management-showdown-todoist-vs-ticktick-vs-things-3': 'photo-1484480974693-6ca0a78fb36b', // Task list productivity desk
  'gamesir-g8-galileo-setup-guide-hall-effect-keymapping': 'photo-1592840496694-26d035b52b48', // Controller joysticks & buttons
  '5g-standalone-vs-sub6ghz-vs-lte-battery-speed-audit': 'photo-1525547719571-a2d4ac8945e2', // 5G mobile network testing
  'annual-mobile-accessibility-audit-screen-readers-voice-control': 'photo-1573496359142-b8d87734a5a2', // Accessibility smartphone use
  'securing-mobile-financial-transactions-biometrics-enclaves': 'photo-1563986768609-322da13575f3', // Mobile security & biometrics
  'magnetic-qi2-wireless-charging-vs-wired-usb-pd-thermals': 'photo-1609091839311-d5365f9ff1c5', // Magnetic wireless charging pad
  'stylus-dynamics-compared-apple-pencil-pro-vs-samsung-spen': 'photo-1563206767-5b18f218e8de', // Stylus pen precision drawing
  'interactive-home-screen-widgets-action-button-automations-guide': 'photo-1523206489230-c012c64b2b48', // Smartphone widgets on desk
  'decentralized-mobile-social-networks-bluesky-nostr-atproto': 'photo-1516251193007-45ef944ab0c6', // Social network feeds

  // Batch 6
  'mindfulness-subscriptions-tested-headspace-vs-calm-pricing': 'photo-1506126613408-eca07ce68773', // Mindfulness meditation & phone
  'mastering-gyroscope-aiming-mobile-fps-controller-calibration': 'photo-1542751371-adc38448a05e', // Gyro motion aiming gaming
  'foolproof-smartphone-backups-photos-documents-disaster-recovery': 'photo-1512499617640-c74ae3a79d37', // Phone backup workflow
  'mobile-privacy-standard-biometric-enclave-sandboxing-audit': 'photo-1563986768609-322da13575f3', // Biometric security enclave
  'mobile-encrypted-dns-doh-dot-vs-wireguard-vpns-threat-models': 'photo-1544197150-b99a580bb7a8', // Encrypted DNS server rack
  'diagnosing-kernel-wakelocks-background-app-drains-guide': 'photo-1580910051074-3eb694886505', // Battery stats & CPU monitoring
  'high-resolution-mobile-audio-recording-usb-interfaces-tablets': 'photo-1590602847861-f357a9332bbc', // Studio microphone recording
  'taming-android-notification-channels-granular-alerts-guide': 'photo-1598327105666-5b89351aff97', // Notification alerts on phone
  'offline-first-personal-knowledge-apps-local-vector-search-beta': 'photo-1499750310107-5fef28a66643', // Knowledge notes on desk
  'consumer-vpn-subscriptions-compared-mullvad-proton-ivpn-transparency': 'photo-1550751827-4bd374c3f58b', // VPN security connection

  // Batch 7
  'active-smartphone-magnetic-coolers-sustained-fps-benchmarks': 'photo-1585338107529-13afc5f02586', // Hardware cooler & electronics
  'essential-offline-navigation-apps-gps-travel-guide': 'photo-1524661135-423995f22d0b', // GPS navigation maps on phone
  'sustained-thermal-throttling-benchmark-flagship-processors': 'photo-1555680202-c86f0e12f086', // High performance processor die
  'corporate-work-profiles-personal-phones-mdm-privacy-audit': 'photo-1486406146926-c627a92ad1ab', // Corporate office workplace
  'extreme-temperature-effects-lithium-batteries-cold-vs-heat': 'photo-1483921020237-2ff51e8e4b22', // Winter freezing conditions
  'mobile-hand-drawn-animation-toonsquid-vs-callipeg-ipados': 'photo-1628155930542-3c7a64e2c833', // Hand-drawn 2D animation tablet
  'spatial-audio-calibration-personalized-head-tracking-guide': 'photo-1508700115892-45ecd05ae2ad', // Spatial sound acoustics
  'mobile-audio-synthesis-sound-design-next-gen-daw-plugins': 'photo-1516280440614-37939bbacd81', // Audio DAW synth mixer
  'podcast-player-showdown-overcast-premium-vs-pocket-casts-plus': 'photo-1590602847861-f357a9332bbc', // Podcast microphone & phone
  'pairing-console-gamepads-ps5-dualsense-xbox-mobile-latency': 'photo-1592840496694-26d035b52b48'  // PS5 DualSense controller
};

function downloadAndSavePhoto(slug, photoId) {
  return new Promise((resolve, reject) => {
    const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1280&h=720&q=85`;
    const dest = path.join(imagesDir, `${slug}.webp`);

    https.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${photoId}: HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', async () => {
        try {
          const buf = Buffer.concat(chunks);
          await sharp(buf)
            .resize(1280, 720, { fit: 'cover' })
            .webp({ quality: 85, effort: 4 })
            .toFile(dest);
          resolve(dest);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const entries = Object.entries(PHOTO_MAP);
  console.log(`Starting download and processing of ${entries.length} title-specific editorial photographs...`);

  // Process in concurrent batches of 5
  const concurrency = 5;
  let completed = 0;

  for (let i = 0; i < entries.length; i += concurrency) {
    const chunk = entries.slice(i, i + concurrency);
    await Promise.all(chunk.map(async ([slug, photoId]) => {
      try {
        await downloadAndSavePhoto(slug, photoId);
        completed++;
        console.log(`[${completed}/${entries.length}] Saved: ${slug}.webp`);
      } catch (err) {
        console.error(`Error processing ${slug} (${photoId}):`, err.message);
      }
    }));
  }

  console.log(`\nAll ${completed} title-specific editorial photographs have been successfully updated!`);
}

run().catch(err => {
  console.error('Fatal error downloading photos:', err);
  process.exit(1);
});
