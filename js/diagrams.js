(function () {
  const DIAGRAMS = {
    "stage-1": {
      en: {
        caption: "Interactive Architecture · Redirect vs. S2S IPN",
        legend: [
          { color: "var(--good)", label: "authoritative IPN" },
          { color: "var(--warn)", label: "untrusted redirect" },
          { color: "var(--svg-violet-stroke)", label: "HMAC-SHA256 guard" }
        ],
        steps: [
          {
            label: "1. Redirect",
            note: "Browser Return URL only updates UI — network drops or tampered query params never touch the ledger.",
            hud: [
              { label: "CHANNEL", value: "Return URL", level: "warn" },
              { label: "TRUST", value: "Untrusted", level: "bad" },
              { label: "ORDER STATE", value: "PENDING", level: "neutral" },
              { label: "DB MUTATION", value: "Blocked", level: "good" }
            ]
          },
          {
            label: "2. S2S IPN",
            note: "Gateway calls Merchant server-to-server; canonical HMAC-SHA256 + timingSafeEqual + Idempotency key verify authenticity.",
            hud: [
              { label: "CHANNEL", value: "S2S IPN", level: "good" },
              { label: "SIGNATURE", value: "HMAC-256 ✓", level: "good" },
              { label: "REPLAY GUARD", value: "Idempotent", level: "good" },
              { label: "ORDER STATE", value: "VERIFYING", level: "neutral" }
            ]
          },
          {
            label: "3. Commit",
            note: "Verified callback atomically commits PENDING → SUCCESS in Order Ledger DB and finalizes reserved inventory.",
            hud: [
              { label: "CHANNEL", value: "S2S IPN", level: "good" },
              { label: "SIGNATURE", value: "Verified", level: "good" },
              { label: "ORDER STATE", value: "SUCCESS", level: "good" },
              { label: "INVENTORY", value: "Committed", level: "good" }
            ]
          }
        ]
      },
      vi: {
        caption: "Sơ đồ kiến trúc tương tác · Redirect vs. S2S IPN",
        legend: [
          { color: "var(--good)", label: "IPN máy chủ xác thực" },
          { color: "var(--warn)", label: "Redirect trình duyệt" },
          { color: "var(--svg-violet-stroke)", label: "Chốt chặn HMAC-SHA256" }
        ],
        steps: [
          {
            label: "1. Redirect",
            note: "Return URL trên trình duyệt chỉ đổi màn hình UI — rớt mạng hay sửa tham số URL không bao giờ ghi vào sổ cái.",
            hud: [
              { label: "KÊNH", value: "Return URL", level: "warn" },
              { label: "TIN CẬY", value: "Không tin cậy", level: "bad" },
              { label: "TRẠNG THÁI", value: "PENDING", level: "neutral" },
              { label: "GHI DB", value: "Bị chặn", level: "good" }
            ]
          },
          {
            label: "2. S2S IPN",
            note: "Gateway gọi ngầm trực tiếp sang Merchant; xác thực chuỗi chuẩn hóa HMAC-SHA256, timingSafeEqual và khóa Idempotency.",
            hud: [
              { label: "KÊNH", value: "S2S IPN", level: "good" },
              { label: "CHỮ KÝ", value: "HMAC-256 ✓", level: "good" },
              { label: "CHỐNG TRÙNG", value: "Idempotent", level: "good" },
              { label: "TRẠNG THÁI", value: "ĐANG XÁC THỰC", level: "neutral" }
            ]
          },
          {
            label: "3. Chốt đơn",
            note: "Callback hợp lệ chuyển trạng thái nguyên tử PENDING → SUCCESS trong Order DB và hoàn tất trừ kho đã giữ.",
            hud: [
              { label: "KÊNH", value: "S2S IPN", level: "good" },
              { label: "CHỮ KÝ", value: "Hợp lệ", level: "good" },
              { label: "TRẠNG THÁI", value: "SUCCESS", level: "good" },
              { label: "TỒN KHO", value: "Đã chốt", level: "good" }
            ]
          }
        ]
      },
      renderSvg(step, lang) {
        const s0 = step === 0;
        const s1 = step === 1;
        const s2 = step === 2;
        const t = lang === "vi"
          ? {
              browser: "Trình duyệt",
              browserSub: "Khách hàng",
              merchant: "Merchant",
              merchantSub: "Máy chủ cửa hàng",
              gateway: "Cổng Ví",
              gatewaySub: "Payment Gateway",
              db: "Order DB",
              redirectPill: "Return URL · chỉ UI",
              ipnPill: "S2S IPN · HMAC ✓",
              guardPill: "timingSafeEqual + Idempotency",
              commitPill: s2 ? "PENDING → SUCCESS" : "Khóa tồn kho: PENDING"
            }
          : {
              browser: "Browser",
              browserSub: "Customer UI",
              merchant: "Merchant",
              merchantSub: "Backend Server",
              gateway: "Gateway",
              gatewaySub: "E-Wallet Provider",
              db: "Order DB",
              redirectPill: "Return URL · UI only",
              ipnPill: "S2S IPN · HMAC ✓",
              guardPill: "timingSafeEqual + Idempotency",
              commitPill: s2 ? "PENDING → SUCCESS" : "Stock Hold: PENDING"
            };

        return `
          <svg class="stage-svg" viewBox="0 0 780 350" role="img" aria-label="Stage 1 E-Wallet Payment Architecture Diagram">
            <defs>
              <marker id="arr-ink-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--ink)"/>
              </marker>
              <marker id="arr-good-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--good)"/>
              </marker>
              <marker id="arr-warn-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--warn)"/>
              </marker>
            </defs>

            <!-- Untrusted Redirect Path: Gateway -> Browser -> Merchant -->
            <g class="svg-flow ${s0 ? "is-active" : "is-dim"}">
              <path id="s1-redirect" d="M 575 102 C 425 42, 220 56, 132 145" fill="none" stroke="var(--warn)" stroke-width="${s0 ? 2.6 : 1.7}" stroke-dasharray="6 5" marker-end="url(#arr-warn-1)"/>
              <path d="M 190 218 L 325 198" fill="none" stroke="var(--warn)" stroke-width="${s0 ? 2.4 : 1.5}" stroke-dasharray="5 5" marker-end="url(#arr-warn-1)"/>
              ${s0 ? '<circle r="5" fill="var(--warn)" stroke="var(--ink)" stroke-width="1.4"><animateMotion dur="2.6s" repeatCount="indefinite" path="M 575 102 C 425 42, 220 56, 132 145"/></circle>' : ""}
              <g transform="translate(230, 56)">
                <rect x="0" y="0" width="176" height="26" rx="13" fill="var(--svg-pill-bg)" stroke="${s0 ? "var(--warn)" : "var(--ink)"}" stroke-width="1.5"/>
                <circle cx="15" cy="13" r="4" fill="var(--warn)"/>
                <text x="27" y="17" class="svg-pill-txt">${t.redirectPill}</text>
              </g>
            </g>

            <!-- Authoritative S2S IPN Path: Gateway -> Merchant -->
            <g class="svg-flow ${s1 || s2 ? "is-active" : "is-dim"}">
              <path d="M 565 138 L 456 174" fill="none" stroke="var(--good)" stroke-width="${s1 ? 3 : 2.1}" marker-end="url(#arr-good-1)"/>
              ${s1 ? '<circle r="5.2" fill="var(--good)" stroke="var(--ink)" stroke-width="1.4"><animateMotion dur="1.7s" repeatCount="indefinite" path="M 565 138 L 456 174"/></circle>' : ""}
            </g>

            <!-- State Commit Path: Merchant -> Order DB -->
            <g class="svg-flow ${s2 ? "is-active" : "is-dim"}">
              <path d="M 452 222 L 568 264" fill="none" stroke="${s2 ? "var(--good)" : "var(--ink)"}" stroke-width="${s2 ? 3 : 1.7}" stroke-dasharray="${s2 ? "none" : "4 4"}" marker-end="url(#${s2 ? "arr-good-1" : "arr-ink-1"})"/>
              ${s2 ? '<circle r="5.2" fill="var(--good)" stroke="var(--ink)" stroke-width="1.4"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 452 222 L 568 264"/></circle>' : ""}
            </g>

            <!-- NODE 1: Customer Browser (Isometric Tablet/Platform) -->
            <g transform="translate(125, 212)" class="svg-node ${s0 ? "is-focus" : ""}">
              <polygon points="0,-44 78,-8 0,28 -78,-8" fill="var(--svg-shadow)" transform="translate(0, 14)" opacity="0.22"/>
              <polygon points="0,-44 78,-8 0,28 -78,-8" fill="var(--svg-cream)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="-78,-8 0,28 0,39 -78,3" fill="var(--svg-cream-side)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="78,-8 0,28 0,39 78,3" fill="var(--svg-cream-dark)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Screen inlay -->
              <polygon points="0,-34 58,-8 0,18 -58,-8" fill="var(--svg-blue-soft)" stroke="var(--ink)" stroke-width="1.3" stroke-linejoin="round"/>
              <text x="0" y="-4" text-anchor="middle" class="svg-node-sm">${t.browser}</text>
              <g transform="translate(-54, 48)">
                <rect x="0" y="0" width="108" height="24" rx="12" fill="var(--svg-pill-bg)" stroke="var(--ink)" stroke-width="1.4"/>
                <text x="54" y="16" text-anchor="middle" class="svg-pill-txt">${t.browserSub}</text>
              </g>
            </g>

            <!-- NODE 2: Merchant Server (Isometric Blue Cube) -->
            <g transform="translate(390, 195)" class="svg-node ${s1 ? "is-focus" : ""}">
              <polygon points="0,-54 62,-24 0,6 -62,-24" fill="var(--svg-shadow)" transform="translate(0, 56)" opacity="0.2"/>
              <polygon points="0,-54 62,-24 0,6 -62,-24" fill="var(--svg-blue-top)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="-62,-24 0,6 0,50 -62,20" fill="var(--svg-blue-left)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="62,-24 0,6 0,50 62,20" fill="var(--svg-blue-right)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Server glyph -->
              <rect x="-15" y="-36" width="30" height="9" rx="2.5" fill="var(--svg-pill-bg)" stroke="var(--ink)" stroke-width="1.3"/>
              <circle cx="-8" cy="-31.5" r="1.6" fill="var(--good)"/>
              <line x1="-2" y1="-31.5" x2="10" y2="-31.5" stroke="var(--ink)" stroke-width="1.3" stroke-linecap="round"/>
              <text x="0" y="-13" text-anchor="middle" class="svg-node-title">${t.merchant}</text>
              <text x="0" y="28" text-anchor="middle" class="svg-node-sub">Node.js</text>
              <!-- Guard Pill -->
              <g transform="translate(-104, 62)">
                <rect x="0" y="0" width="208" height="25" rx="12.5" fill="${s1 ? "var(--violet)" : "var(--svg-pill-bg)"}" stroke="var(--ink)" stroke-width="1.5"/>
                <text x="104" y="16.5" text-anchor="middle" class="svg-pill-txt">${t.guardPill}</text>
              </g>
            </g>

            <!-- NODE 3: Payment Gateway (Isometric Violet Cube) -->
            <g transform="translate(642, 118)" class="svg-node ${s1 ? "is-focus" : ""}">
              <polygon points="0,-46 56,-19 0,8 -56,-19" fill="var(--svg-violet-top)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="-56,-19 0,8 0,46 -56,19" fill="var(--svg-violet-left)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="56,-19 0,8 0,46 56,19" fill="var(--svg-violet-right)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <text x="0" y="-14" text-anchor="middle" class="svg-node-title">${t.gateway}</text>
              <text x="0" y="26" text-anchor="middle" class="svg-node-sub">E-Wallet</text>
            </g>

            <!-- Floating IPN Pill Overlay (always above cubes, clear of Gateway) -->
            <g class="svg-flow ${s1 || s2 ? "is-active" : "is-dim"}" transform="translate(414, 96)">
              <rect x="0" y="0" width="154" height="26" rx="13" fill="var(--svg-pill-bg)" stroke="${s1 ? "var(--good)" : "var(--ink)"}" stroke-width="1.5"/>
              <circle cx="14" cy="13" r="4" fill="var(--good)"/>
              <text x="25" y="17" class="svg-pill-txt">${t.ipnPill}</text>
            </g>

            <!-- NODE 4: Order Ledger DB (Isometric Green Cylinder) -->
            <g transform="translate(642, 268)" class="svg-node ${s2 ? "is-focus" : ""}">
              <path d="M -46,-16 L -46,24 A 46 18 0 0 0 46,24 L 46,-16 Z" fill="var(--svg-green-side)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <ellipse cx="0" cy="-16" rx="46" ry="18" fill="var(--svg-green-top)" stroke="var(--ink)" stroke-width="1.8"/>
              <path d="M -46,4 A 46 18 0 0 0 46,4" fill="none" stroke="var(--ink)" stroke-width="1.2" opacity="0.45"/>
              <text x="0" y="-12" text-anchor="middle" class="svg-node-title">${t.db}</text>
              <g transform="translate(-82, 46)">
                <rect x="0" y="0" width="164" height="25" rx="12.5" fill="${s2 ? "var(--green)" : "var(--svg-pill-bg)"}" stroke="var(--ink)" stroke-width="1.5"/>
                <text x="82" y="16.5" text-anchor="middle" class="svg-pill-txt">${t.commitPill}</text>
              </g>
            </g>
          </svg>`;
      }
    },

    "stage-2": {
      en: {
        caption: "Interactive UX Flow · Active Polling Fallback (/pay/query)",
        legend: [
          { color: "var(--warn)", label: "delayed webhook" },
          { color: "var(--svg-blue-stroke)", label: "active poll /pay/query" },
          { color: "var(--good)", label: "settled receipt & UAT pass" }
        ],
        steps: [
          {
            label: "1. IPN Delay",
            note: "User scans QR and wallet deducts funds, but peak-hour latency delays the async IPN webhook.",
            hud: [
              { label: "IPN LATENCY", value: "4.2s peak", level: "warn" },
              { label: "UI FEEDBACK", value: "Confirming…", level: "neutral" },
              { label: "DOUBLE PAY", value: "Prevented", level: "good" },
              { label: "UAT GATE", value: "Active", level: "neutral" }
            ]
          },
          {
            label: "2. Poll Query",
            note: "Checkout screen stays calm and polls /v2/gateway/pay/query at safe intervals instead of failing early.",
            hud: [
              { label: "FALLBACK", value: "/pay/query", level: "good" },
              { label: "INTERVAL", value: "2.0s poll", level: "neutral" },
              { label: "HTTP STATUS", value: "200 OK", level: "good" },
              { label: "SECURITY", value: "Server-auth", level: "good" }
            ]
          },
          {
            label: "3. Receipt",
            note: "Settlement confirmed deterministically — UI transitions cleanly to Receipt and matches Given-When-Then UAT.",
            hud: [
              { label: "UI STATE", value: "Receipt ✓", level: "good" },
              { label: "ORDER", value: "SETTLED", level: "good" },
              { label: "GHERKIN AC", value: "Verified", level: "good" },
              { label: "POSTMAN", value: "100% pass", level: "good" }
            ]
          }
        ]
      },
      vi: {
        caption: "Luồng UX tương tác · Chủ động truy vấn (/pay/query)",
        legend: [
          { color: "var(--warn)", label: "Webhook trễ giờ cao điểm" },
          { color: "var(--svg-blue-stroke)", label: "Truy vấn /pay/query" },
          { color: "var(--good)", label: "Biên lai & UAT đạt" }
        ],
        steps: [
          {
            label: "1. Trễ IPN",
            note: "Khách đã quét QR và ví đã trừ tiền nhưng mạng giờ cao điểm khiến gói tin IPN về máy chủ bị trễ.",
            hud: [
              { label: "ĐỘ TRỄ IPN", value: "4.2s trễ", level: "warn" },
              { label: "GIAO DIỆN", value: "Đang xác nhận", level: "neutral" },
              { label: "TRẢ TRÙNG", value: "Đã khóa", level: "good" },
              { label: "CỔNG UAT", value: "Hoạt động", level: "neutral" }
            ]
          },
          {
            label: "2. Truy vấn",
            note: "Màn hình chờ bình tĩnh, chủ động gọi /v2/gateway/pay/query định kỳ thay vì báo lỗi sớm gây hoang mang.",
            hud: [
              { label: "DỰ PHÒNG", value: "/pay/query", level: "good" },
              { label: "CHU KỲ", value: "2.0s / lần", level: "neutral" },
              { label: "PHẢN HỒI", value: "200 OK", level: "good" },
              { label: "BẢO MẬT", value: "Xác thực S2S", level: "good" }
            ]
          },
          {
            label: "3. Biên lai",
            note: "Xác nhận thanh toán dứt khoát — tự mở màn hình biên lai và khớp 100% kịch bản Given-When-Then trên Postman.",
            hud: [
              { label: "GIAO DIỆN", value: "Biên lai ✓", level: "good" },
              { label: "ĐƠN HÀNG", value: "HOÀN TẤT", level: "good" },
              { label: "GHERKIN AC", value: "Đạt chuẩn", level: "good" },
              { label: "POSTMAN", value: "100% pass", level: "good" }
            ]
          }
        ]
      },
      renderSvg(step, lang) {
        const s0 = step === 0;
        const s1 = step === 1;
        const s2 = step === 2;
        const t = lang === "vi"
          ? {
              qr: "QR Checkout",
              qrState: s2 ? "Biên lai ✓" : s1 ? "Đang kiểm tra…" : "Đếm ngược 04:48",
              api: "Merchant",
              gw: "Gateway",
              uat: "UAT Gate",
              delayPill: "IPN chậm 4.2s",
              pollPill: "GET /pay/query · 2s",
              uatPill: s2 ? "Given-When-Then ✓" : "Kịch bản Gherkin"
            }
          : {
              qr: "QR Checkout",
              qrState: s2 ? "Receipt Ready ✓" : s1 ? "Polling status…" : "Countdown 04:48",
              api: "Merchant",
              gw: "Gateway",
              uat: "UAT Gate",
              delayPill: "IPN delayed 4.2s",
              pollPill: "GET /pay/query · 2s",
              uatPill: s2 ? "Given-When-Then ✓" : "Gherkin Suite"
            };

        return `
          <svg class="stage-svg" viewBox="0 0 780 350" role="img" aria-label="Stage 2 Checkout UX and Polling Fallback Diagram">
            <defs>
              <marker id="arr-good-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--good)"/>
              </marker>
              <marker id="arr-warn-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--warn)"/>
              </marker>
              <marker id="arr-blue-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--svg-blue-stroke)"/>
              </marker>
            </defs>

            <!-- Delayed Webhook Path -->
            <g class="svg-flow ${s0 ? "is-active" : "is-dim"}">
              <path d="M 565 112 C 510 88, 465 98, 434 140" fill="none" stroke="var(--warn)" stroke-width="${s0 ? 2.6 : 1.6}" stroke-dasharray="4 6" marker-end="url(#arr-warn-2)"/>
              ${s0 ? '<circle r="5" fill="var(--warn)" stroke="var(--ink)" stroke-width="1.4"><animateMotion dur="3.4s" repeatCount="indefinite" path="M 565 112 C 510 88, 465 98, 434 140"/></circle>' : ""}
              <g transform="translate(415, 56)">
                <rect x="0" y="0" width="138" height="25" rx="12.5" fill="var(--svg-pill-bg)" stroke="${s0 ? "var(--warn)" : "var(--ink)"}" stroke-width="1.5"/>
                <circle cx="14" cy="12.5" r="4" fill="var(--warn)"/>
                <text x="25" y="16.5" class="svg-pill-txt">${t.delayPill}</text>
              </g>
            </g>

            <!-- Active Polling Path: QR UI <-> Merchant <-> Gateway -->
            <g class="svg-flow ${s1 ? "is-active" : "is-dim"}">
              <path d="M 192 192 L 326 192" fill="none" stroke="var(--svg-blue-stroke)" stroke-width="${s1 ? 2.8 : 1.7}" stroke-dasharray="6 4" marker-end="url(#arr-blue-2)"/>
              <path d="M 456 178 L 566 142" fill="none" stroke="var(--svg-blue-stroke)" stroke-width="${s1 ? 2.8 : 1.7}" stroke-dasharray="6 4" marker-end="url(#arr-blue-2)"/>
              ${s1 ? '<circle r="5" fill="var(--svg-blue-stroke)" stroke="var(--ink)" stroke-width="1.3"><animateMotion dur="1.6s" repeatCount="indefinite" path="M 192 192 L 326 192"/></circle><circle r="5" fill="var(--svg-blue-stroke)" stroke="var(--ink)" stroke-width="1.3"><animateMotion dur="1.6s" repeatCount="indefinite" path="M 456 178 L 566 142"/></circle>' : ""}
              <g transform="translate(202, 130)">
                <rect x="0" y="0" width="156" height="25" rx="12.5" fill="var(--svg-pill-bg)" stroke="${s1 ? "var(--svg-blue-stroke)" : "var(--ink)"}" stroke-width="1.5"/>
                <circle cx="14" cy="12.5" r="4" fill="var(--svg-blue-stroke)"/>
                <text x="25" y="16.5" class="svg-pill-txt">${t.pollPill}</text>
              </g>
            </g>

            <!-- Settled Return + UAT Verification -->
            <g class="svg-flow ${s2 ? "is-active" : "is-dim"}">
              <path d="M 328 214 L 194 214" fill="none" stroke="var(--good)" stroke-width="${s2 ? 3 : 1.6}" marker-end="url(#arr-good-2)"/>
              <path d="M 452 222 L 568 262" fill="none" stroke="var(--good)" stroke-width="${s2 ? 2.8 : 1.6}" marker-end="url(#arr-good-2)"/>
              ${s2 ? '<circle r="5" fill="var(--good)" stroke="var(--ink)" stroke-width="1.4"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 328 214 L 194 214"/></circle>' : ""}
            </g>

            <!-- NODE 1: QR Checkout Card -->
            <g transform="translate(124, 198)" class="svg-node ${s0 || s2 ? "is-focus" : ""}">
              <rect x="-64" y="-62" width="128" height="124" rx="14" fill="var(--ink)" transform="translate(3, 4)" opacity="0.9"/>
              <rect x="-64" y="-62" width="128" height="124" rx="14" fill="var(--svg-cream)" stroke="var(--ink)" stroke-width="1.8"/>
              <text x="0" y="-38" text-anchor="middle" class="svg-node-title">${t.qr}</text>
              <!-- Mini QR motif -->
              <g transform="translate(-22, -26)">
                <rect x="0" y="0" width="44" height="44" rx="6" fill="var(--svg-pill-bg)" stroke="var(--ink)" stroke-width="1.4"/>
                <rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="var(--ink)" stroke-width="2"/>
                <rect x="26" y="6" width="12" height="12" rx="1.5" fill="none" stroke="var(--ink)" stroke-width="2"/>
                <rect x="6" y="26" width="12" height="12" rx="1.5" fill="none" stroke="var(--ink)" stroke-width="2"/>
                <rect x="25" y="25" width="6" height="6" fill="var(--ink)"/>
                <rect x="33" y="33" width="5" height="5" fill="var(--ink)"/>
              </g>
              <g transform="translate(-54, 28)">
                <rect x="0" y="0" width="108" height="22" rx="11" fill="${s2 ? "var(--green)" : s1 ? "var(--svg-blue-soft)" : "var(--sand)"}" stroke="var(--ink)" stroke-width="1.3"/>
                <text x="54" y="14.5" text-anchor="middle" class="svg-pill-txt">${t.qrState}</text>
              </g>
            </g>

            <!-- NODE 2: Merchant API Cube -->
            <g transform="translate(396, 195)" class="svg-node ${s1 ? "is-focus" : ""}">
              <polygon points="0,-52 62,-23 0,6 -62,-23" fill="var(--svg-blue-top)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="-62,-23 0,6 0,48 -62,19" fill="var(--svg-blue-left)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="62,-23 0,6 0,48 62,19" fill="var(--svg-blue-right)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <text x="0" y="-17" text-anchor="middle" class="svg-node-title">${t.api}</text>
              <text x="0" y="26" text-anchor="middle" class="svg-node-sub">API · Poll</text>
            </g>

            <!-- NODE 3: Gateway /pay/query -->
            <g transform="translate(636, 122)" class="svg-node ${s0 || s1 ? "is-focus" : ""}">
              <polygon points="0,-46 58,-19 0,8 -58,-19" fill="var(--svg-sand-top)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="-58,-19 0,8 0,46 -58,19" fill="var(--svg-sand-left)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="58,-19 0,8 0,46 58,19" fill="var(--svg-sand-right)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <text x="0" y="-14" text-anchor="middle" class="svg-node-title">${t.gw}</text>
              <text x="0" y="26" text-anchor="middle" class="svg-node-sub">/pay/query</text>
            </g>

            <!-- NODE 4: UAT & Postman Gate -->
            <g transform="translate(636, 268)" class="svg-node ${s2 ? "is-focus" : ""}">
              <polygon points="0,-44 60,-17 0,10 -60,-17" fill="var(--svg-green-top)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="-60,-17 0,10 0,44 -60,17" fill="var(--svg-green-side)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="60,-17 0,10 0,44 60,17" fill="var(--svg-green-dark)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <text x="0" y="-13" text-anchor="middle" class="svg-node-title">${t.uat}</text>
              <text x="0" y="26" text-anchor="middle" class="svg-node-sub">Postman</text>
              <g transform="translate(-74, 48)">
                <rect x="0" y="0" width="148" height="24" rx="12" fill="${s2 ? "var(--green)" : "var(--svg-pill-bg)"}" stroke="var(--ink)" stroke-width="1.4"/>
                <text x="74" y="15.5" text-anchor="middle" class="svg-pill-txt">${t.uatPill}</text>
              </g>
            </g>
          </svg>`;
      }
    },

    "stage-3": {
      en: {
        caption: "Interactive Data Pipeline · Three-Way Settlement Reconciliation",
        legend: [
          { color: "var(--good)", label: "matched ledger" },
          { color: "var(--bad)", label: "MISSING_IPN defect" },
          { color: "var(--warn)", label: "AMOUNT_MISMATCH / T+1" }
        ],
        steps: [
          {
            label: "1. 3-Way Join",
            note: "SQL CTE cross-joins Merchant Orders, Gateway Transaction Logs, and Bank Settlement statements by order_id.",
            hud: [
              { label: "SOURCES", value: "3 Ledgers", level: "good" },
              { label: "ENGINE", value: "SQLite CTE", level: "neutral" },
              { label: "JOIN KEY", value: "order_id", level: "neutral" },
              { label: "COVERAGE", value: "100% rows", level: "good" }
            ]
          },
          {
            label: "2. Flag Drift",
            note: "Case rules immediately isolate settled bank credits with unpaid orders (MISSING_IPN) and net fee discrepancies (AMOUNT_MISMATCH).",
            hud: [
              { label: "MISSING_IPN", value: "2 flagged", level: "bad" },
              { label: "MISMATCH", value: "1 fee diff", level: "warn" },
              { label: "CARD TEST", value: "0-amt rule", level: "warn" },
              { label: "AUDIT", value: "Deterministic", level: "good" }
            ]
          },
          {
            label: "3. Close Loop",
            note: "Separates true engineering bugs from T+1 bank cutoff timing and feeds funnel drop-offs directly into the product backlog.",
            hud: [
              { label: "TRUE BUGS", value: "Isolated", level: "good" },
              { label: "T+1 CUTOFF", value: "Explained", level: "good" },
              { label: "FUNNEL FIX", value: "Deep-link UX", level: "good" },
              { label: "NET DRIFT", value: "0.00%", level: "good" }
            ]
          }
        ]
      },
      vi: {
        caption: "Luồng dữ liệu tương tác · Đối soát tài chính ba bên",
        legend: [
          { color: "var(--good)", label: "Khớp sổ cái (MATCHED)" },
          { color: "var(--bad)", label: "Lỗi thiếu IPN (MISSING_IPN)" },
          { color: "var(--warn)", label: "Lệch tiền / T+1 cutoff" }
        ],
        steps: [
          {
            label: "1. Kết nối 3 bên",
            note: "Truy vấn SQL CTE nối chéo Sổ đơn hàng, Nhật ký Cổng ví và Sao kê Ngân hàng theo khóa order_id.",
            hud: [
              { label: "NGUỒN SỔ", value: "3 Sổ cái", level: "good" },
              { label: "CÔNG CỤ", value: "SQLite CTE", level: "neutral" },
              { label: "KHÓA NỐI", value: "order_id", level: "neutral" },
              { label: "PHẠM VI", value: "100% dòng", level: "good" }
            ]
          },
          {
            label: "2. Bóc tách lệch",
            note: "Tự động gắn cờ ca tiền đã về ngân hàng nhưng đơn chưa chốt (MISSING_IPN) và ca lệch phí quyết toán (AMOUNT_MISMATCH).",
            hud: [
              { label: "MISSING_IPN", value: "2 ca lỗi", level: "bad" },
              { label: "LỆCH TIỀN", value: "1 ca phí", level: "warn" },
              { label: "THỬ THẺ", value: "Luật 0-đồng", level: "warn" },
              { label: "KIỂM TOÁN", value: "Tất định", level: "good" }
            ]
          },
          {
            label: "3. Khép vòng lặp",
            note: "Tách bạch lỗi kỹ thuật thật khỏi mốc khóa sổ T+1 và chuyển phát hiện điểm rơi phễu thành backlog cải tiến UX.",
            hud: [
              { label: "LỖI THẬT", value: "Đã cô lập", level: "good" },
              { label: "KHÓA SỔ T+1", value: "Đã tách rõ", level: "good" },
              { label: "CẢI TIẾN UX", value: "Deep-link ví", level: "good" },
              { label: "SAI LỆCH RÒNG", value: "0.00%", level: "good" }
            ]
          }
        ]
      },
      renderSvg(step, lang) {
        const s0 = step === 0;
        const s1 = step === 1;
        const s2 = step === 2;
        const t = lang === "vi"
          ? {
              m: "Sổ Merchant",
              g: "Log Gateway",
              b: "Sao kê Bank",
              cte: "SQL CTE",
              cteSub: "recon_audit",
              joinPill: "LEFT JOIN · order_id",
              flag1: "MISSING_IPN",
              flag1Sub: "Bank có · Đơn chưa Paid",
              flag2: "AMOUNT_MISMATCH",
              flag2Sub: "Lệch phí chiết khấu",
              flag3: "MATCHED · T+1 OK",
              flag3Sub: "Khớp sổ & Backlog UX"
            }
          : {
              m: "Merchant DB",
              g: "Gateway Logs",
              b: "Bank Statement",
              cte: "SQL CTE",
              cteSub: "recon_audit",
              joinPill: "LEFT JOIN · order_id",
              flag1: "MISSING_IPN",
              flag1Sub: "Settled · Order unpaid",
              flag2: "AMOUNT_MISMATCH",
              flag2Sub: "Net fee discrepancy",
              flag3: "MATCHED · T+1 OK",
              flag3Sub: "Reconciled & UX Action"
            };

        return `
          <svg class="stage-svg" viewBox="0 0 780 350" role="img" aria-label="Stage 3 Three-Way Financial Settlement Reconciliation Diagram">
            <defs>
              <marker id="arr-ink-3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--ink)"/>
              </marker>
              <marker id="arr-bad-3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--bad)"/>
              </marker>
              <marker id="arr-warn-3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--warn)"/>
              </marker>
              <marker id="arr-good-3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--good)"/>
              </marker>
            </defs>

            <!-- 3 Input Lines into SQL CTE -->
            <g class="svg-flow ${s0 ? "is-active" : "is-dim"}">
              <path d="M 192 84 C 260 84, 285 152, 344 168" fill="none" stroke="var(--ink)" stroke-width="${s0 ? 2.4 : 1.6}" marker-end="url(#arr-ink-3)"/>
              <path d="M 192 182 L 342 182" fill="none" stroke="var(--ink)" stroke-width="${s0 ? 2.4 : 1.6}" marker-end="url(#arr-ink-3)"/>
              <path d="M 192 280 C 260 280, 285 212, 344 196" fill="none" stroke="var(--ink)" stroke-width="${s0 ? 2.4 : 1.6}" marker-end="url(#arr-ink-3)"/>
              ${s0 ? '<circle r="4.6" fill="var(--good)" stroke="var(--ink)" stroke-width="1.3"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 192 84 C 260 84, 285 152, 344 168"/></circle><circle r="4.6" fill="var(--svg-blue-stroke)" stroke="var(--ink)" stroke-width="1.3"><animateMotion dur="2.1s" repeatCount="indefinite" path="M 192 182 L 342 182"/></circle><circle r="4.6" fill="var(--warn)" stroke="var(--ink)" stroke-width="1.3"><animateMotion dur="2.4s" repeatCount="indefinite" path="M 192 280 C 260 280, 285 212, 344 196"/></circle>' : ""}
              <g transform="translate(216, 42)">
                <rect x="0" y="0" width="150" height="24" rx="12" fill="var(--svg-pill-bg)" stroke="var(--ink)" stroke-width="1.4"/>
                <text x="75" y="15.5" text-anchor="middle" class="svg-pill-txt">${t.joinPill}</text>
              </g>
            </g>

            <!-- Output Lines from SQL CTE to Diagnostic Buckets -->
            <g class="svg-flow ${s1 ? "is-active" : "is-dim"}">
              <path d="M 468 164 C 505 150, 520 96, 558 92" fill="none" stroke="var(--bad)" stroke-width="${s1 ? 2.8 : 1.5}" marker-end="url(#arr-bad-3)"/>
              <path d="M 468 182 L 558 182" fill="none" stroke="var(--warn)" stroke-width="${s1 ? 2.8 : 1.5}" marker-end="url(#arr-warn-3)"/>
              ${s1 ? '<circle r="4.8" fill="var(--bad)" stroke="var(--ink)" stroke-width="1.3"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 468 164 C 505 150, 520 96, 558 92"/></circle><circle r="4.8" fill="var(--warn)" stroke="var(--ink)" stroke-width="1.3"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 468 182 L 558 182"/></circle>' : ""}
            </g>
            <g class="svg-flow ${s2 ? "is-active" : "is-dim"}">
              <path d="M 468 200 C 505 214, 520 268, 558 272" fill="none" stroke="var(--good)" stroke-width="${s2 ? 2.8 : 1.5}" marker-end="url(#arr-good-3)"/>
              ${s2 ? '<circle r="5" fill="var(--good)" stroke="var(--ink)" stroke-width="1.3"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 468 200 C 505 214, 520 268, 558 272"/></circle>' : ""}
            </g>

            <!-- Cylinder 1: Merchant DB -->
            <g transform="translate(128, 84)">
              <path d="M -56,-14 L -56,16 A 56 14 0 0 0 56,16 L 56,-14 Z" fill="var(--svg-green-side)" stroke="var(--ink)" stroke-width="1.7"/>
              <ellipse cx="0" cy="-14" rx="56" ry="14" fill="var(--svg-green-top)" stroke="var(--ink)" stroke-width="1.7"/>
              <text x="0" y="-10" text-anchor="middle" class="svg-node-sm">${t.m}</text>
              <text x="0" y="16" text-anchor="middle" class="svg-node-sub">merchant_orders</text>
            </g>

            <!-- Cylinder 2: Gateway Logs -->
            <g transform="translate(128, 182)">
              <path d="M -56,-14 L -56,16 A 56 14 0 0 0 56,16 L 56,-14 Z" fill="var(--svg-blue-left)" stroke="var(--ink)" stroke-width="1.7"/>
              <ellipse cx="0" cy="-14" rx="56" ry="14" fill="var(--svg-blue-top)" stroke="var(--ink)" stroke-width="1.7"/>
              <text x="0" y="-10" text-anchor="middle" class="svg-node-sm">${t.g}</text>
              <text x="0" y="16" text-anchor="middle" class="svg-node-sub">gateway_txns</text>
            </g>

            <!-- Cylinder 3: Bank Settlement -->
            <g transform="translate(128, 280)">
              <path d="M -56,-14 L -56,16 A 56 14 0 0 0 56,16 L 56,-14 Z" fill="var(--svg-sand-left)" stroke="var(--ink)" stroke-width="1.7"/>
              <ellipse cx="0" cy="-14" rx="56" ry="14" fill="var(--svg-sand-top)" stroke="var(--ink)" stroke-width="1.7"/>
              <text x="0" y="-10" text-anchor="middle" class="svg-node-sm">${t.b}</text>
              <text x="0" y="16" text-anchor="middle" class="svg-node-sub">bank_settlements</text>
            </g>

            <!-- Center Hub: SQL CTE Cube -->
            <g transform="translate(408, 182)" class="svg-node is-focus">
              <polygon points="0,-54 60,-24 0,6 -60,-24" fill="var(--svg-violet-top)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="-60,-24 0,6 0,52 -60,22" fill="var(--svg-violet-left)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="60,-24 0,6 0,52 60,22" fill="var(--svg-violet-right)" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
              <text x="0" y="-18" text-anchor="middle" class="svg-node-title">${t.cte}</text>
              <text x="0" y="28" text-anchor="middle" class="svg-node-sub">${t.cteSub}</text>
            </g>

            <!-- Output Card 1: MISSING_IPN -->
            <g transform="translate(562, 62)" opacity="${s1 ? 1 : 0.62}">
              <rect x="2" y="3" width="188" height="58" rx="10" fill="var(--ink)"/>
              <rect x="0" y="0" width="188" height="58" rx="10" fill="var(--warn-bg)" stroke="var(--ink)" stroke-width="1.6"/>
              <rect x="0" y="0" width="6" height="58" rx="3" fill="var(--bad)"/>
              <text x="16" y="23" class="svg-card-kicker" fill="var(--warn-ink)">${t.flag1}</text>
              <text x="16" y="42" class="svg-card-sub">${t.flag1Sub}</text>
            </g>

            <!-- Output Card 2: AMOUNT_MISMATCH -->
            <g transform="translate(562, 153)" opacity="${s1 ? 1 : 0.62}">
              <rect x="2" y="3" width="188" height="58" rx="10" fill="var(--ink)"/>
              <rect x="0" y="0" width="188" height="58" rx="10" fill="var(--sand)" stroke="var(--ink)" stroke-width="1.6"/>
              <rect x="0" y="0" width="6" height="58" rx="3" fill="var(--warn)"/>
              <text x="16" y="23" class="svg-card-kicker" fill="var(--ink)">${t.flag2}</text>
              <text x="16" y="42" class="svg-card-sub">${t.flag2Sub}</text>
            </g>

            <!-- Output Card 3: MATCHED / T+1 -->
            <g transform="translate(562, 244)" opacity="${s2 ? 1 : 0.62}">
              <rect x="2" y="3" width="188" height="58" rx="10" fill="var(--ink)"/>
              <rect x="0" y="0" width="188" height="58" rx="10" fill="var(--green-tile)" stroke="var(--ink)" stroke-width="1.6"/>
              <rect x="0" y="0" width="6" height="58" rx="3" fill="var(--good)"/>
              <text x="16" y="23" class="svg-card-kicker" fill="var(--ink)">${t.flag3}</text>
              <text x="16" y="42" class="svg-card-sub">${t.flag3Sub}</text>
            </g>
          </svg>`;
      }
    }
  };

  function renderStageMarkup(stageId, lang, options) {
    const def = DIAGRAMS[stageId];
    if (!def) return "";
    const opts = options || {};
    const step = typeof opts.step === "number" ? opts.step : 1;
    const compact = Boolean(opts.compact);
    const loc = def[lang] || def.en;
    const activeStep = loc.steps[step] || loc.steps[0];

    const hudHtml = activeStep.hud
      .map(
        (c) => `
        <div class="hud-chip is-${c.level}">
          <span class="hud-chip__label">${c.label}</span>
          <span class="hud-chip__value">${c.value}</span>
        </div>`
      )
      .join("");

    const stepBtns = loc.steps
      .map(
        (st, idx) => `
        <button class="stage-step-btn ${idx === step ? "is-active" : ""}" type="button" data-diagram-step="${idx}" aria-pressed="${idx === step}">
          ${st.label}
        </button>`
      )
      .join("");

    const legendHtml = loc.legend
      .map(
        (item) => `
        <span class="stage-legend__item">
          <i class="stage-legend__dot" style="background:${item.color}"></i>${item.label}
        </span>`
      )
      .join("");

    return `
      <figure class="diagram-stage ${compact ? "is-compact" : ""}" data-diagram-root="${stageId}" data-diagram-step-current="${step}">
        <div class="stage-head">
          <div class="stage-hud">${hudHtml}</div>
          <div class="stage-controls" role="group" aria-label="Diagram steps">
            ${stepBtns}
          </div>
        </div>
        <div class="stage-canvas">
          ${def.renderSvg(step, lang)}
        </div>
        <div class="stage-foot">
          <div class="stage-legend">${legendHtml}</div>
          ${!compact ? `<p class="stage-note">${activeStep.note}</p>` : ""}
        </div>
      </figure>`;
  }

  function bindDiagrams(container, getLang) {
    const scope = container || document;
    scope.querySelectorAll("[data-diagram-root]").forEach((rootEl) => {
      if (rootEl.dataset.diagramBound === "1") return;
      rootEl.dataset.diagramBound = "1";
      rootEl.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-diagram-step]");
        if (!btn) return;
        const stageId = rootEl.dataset.diagramRoot;
        const nextStep = Number(btn.dataset.diagramStep);
        const compact = rootEl.classList.contains("is-compact");
        const lang = typeof getLang === "function" ? getLang() : "en";
        const wrapper = document.createElement("div");
        wrapper.innerHTML = renderStageMarkup(stageId, lang, { step: nextStep, compact });
        const nextEl = wrapper.firstElementChild;
        if (nextEl) {
          rootEl.replaceWith(nextEl);
          bindDiagrams(nextEl.parentElement || document, getLang);
        }
      });
    });
  }

  window.PORTFOLIO_DIAGRAMS = {
    renderStage: renderStageMarkup,
    bind: bindDiagrams
  };
})();
