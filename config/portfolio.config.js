window.PORTFOLIO_CONFIG = {
  site: {
    name: "Phan Phuc Dat",
    shortName: "Phan Phuc Dat",
    role: {
      en: "IT Business Analyst & System Architecture · UEH",
      vi: "Phân Tích Nghiệp Vụ CNTT (ITBA) & Kiến Trúc Hệ Thống · UEH"
    },
    footerRole: {
      en: "IT Business Analyst · Digital Transformation & FinTech · UEH",
      vi: "IT Business Analyst · Chuyển Đổi Số & Hệ Thống FinTech · UEH"
    },
    location: {
      en: "Ho Chi Minh City, Vietnam",
      vi: "TP. Hồ Chí Minh, Việt Nam"
    },
    copyrightYear: "2026",
    email: "phucdat.work@gmail.com",
    profileImage: "assets/profile.jpg",
    webIcon: "assets/favicon.svg"
  },

  navigation: [
    { key: "about", label: { en: "About", vi: "Giới thiệu" }, href: "index.html" },
    { key: "practice", label: { en: "Practice", vi: "Phương pháp" }, href: "practice.html" },
    { key: "works", label: { en: "Works", vi: "Dự án" }, href: "works.html" },
    { key: "notes", label: { en: "Notes", vi: "Ghi chép" }, href: "notes.html" },
    { key: "stack", label: { en: "Stack", vi: "Công cụ" }, href: "stack.html" }
  ],

  profiles: [
    {
      label: { en: "GitHub", vi: "GitHub" },
      value: "@phucdatphan",
      href: "https://github.com/phucdatphan"
    },
    {
      label: { en: "LinkedIn", vi: "LinkedIn" },
      value: "phucdatphan",
      href: "https://linkedin.com/in/phucdatphan"
    },
    {
      label: { en: "Alma Mater", vi: "Đơn vị đào tạo" },
      value: "UEH · Innovation & Tech",
      href: "https://uii.ueh.edu.vn"
    }
  ],

  pages: {
    about: {
      en: {
        metaTitle: "Phan Phuc Dat — IT Business Analyst & System Architecture",
        metaDescription: "Portfolio of Phan Phuc Dat — IT Business Analyst, Digital Transformation, and FinTech System Architecture.",
        overline: "About",
        greeting: "Hi there.",
        introduction: [
          "I am an Innovation and Technology graduate (**High Distinction**) from the **University of Economics Ho Chi Minh City (UEH)**, based in Vietnam.",
          "My work sits at the intersection of [specification-driven business analysis](practice.html), FinTech payment workflows, and relational data diagnostics. Rather than treating business documentation and software engineering as separate silos, I pair BABOK-aligned specifications directly with working prototypes and analytical SQL pipelines.",
          "This website is a quiet record of the [system architectures](works.html) I build, the [methods and tools](stack.html) I rely on, and the [field notes](notes.html) I write along the way."
        ],
        introductionLinks: [
          { label: "Explore system works", href: "works.html" },
          { label: "Read field notes", href: "notes.html" }
        ],
        nowTitle: "Now",
        now: [
          {
            label: "Focus",
            text: "IT Business Analysis, **Enterprise Digital Transformation**, and FinTech payment workflows."
          },
          {
            label: "Architecture",
            text: "Modeling webhook-driven checkout lifecycles, state transition contracts, and idempotent payment guards."
          },
          {
            label: "Diagnostics",
            text: "Auditing multi-party settlement ledgers, conversion funnels, and payment anomaly rules in **SQL & Python**."
          },
          {
            label: "Open",
            text: "Conversations around IT Business Analysis, Product Systems, and FinTech engineering in Vietnam."
          }
        ],
        exploreTitle: "Explore",
        explore: "Read my [practice & working methodology](practice.html), inspect the [end-to-end E-Wallet system case studies](works.html), browse the [technical & BA stack](stack.html), or read bilingual [engineering & BA field notes](notes.html).",
        reachTitle: "Reach me through",
        reachLinks: [
          { label: "Email", href: "mailto:phucdat.work@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com/in/phucdatphan", external: true },
          { label: "GitHub", href: "https://github.com/phucdatphan", external: true }
        ]
      },
      vi: {
        metaTitle: "Phan Phúc Đạt — IT Business Analyst & Kiến Trúc Hệ Thống",
        metaDescription: "Hồ sơ năng lực của Phan Phúc Đạt — Phân tích nghiệp vụ CNTT (ITBA), Chuyển đổi số và Kiến trúc hệ thống FinTech.",
        overline: "Giới thiệu",
        greeting: "Xin chào.",
        introduction: [
          "Tôi tốt nghiệp loại **Xuất sắc (High Distinction)** ngành Công nghệ và Đổi mới sáng tạo tại **Đại học Kinh tế TP. Hồ Chí Minh (UEH)**.",
          "Công việc của tôi nằm ở giao điểm giữa [phân tích nghiệp vụ hướng đặc tả](practice.html), luồng thanh toán FinTech và chẩn đoán dữ liệu quan hệ. Thay vì tách rời tài liệu nghiệp vụ khỏi kỹ thuật phần mềm, tôi kết hợp đặc tả chuẩn BABOK trực tiếp với các bản mẫu hệ thống chạy thực tế và truy vấn phân tích SQL.",
          "Trang web này là nơi lưu giữ có hệ thống các [kiến trúc dự án](works.html) tôi xây dựng, [phương pháp và bộ công cụ](stack.html) tôi sử dụng, cùng những [ghi chép chuyên môn](notes.html) đúc kết trong quá trình làm việc."
        ],
        introductionLinks: [
          { label: "Xem hồ sơ các dự án", href: "works.html" },
          { label: "Đọc ghi chép chuyên môn", href: "notes.html" }
        ],
        nowTitle: "Hiện tại",
        now: [
          {
            label: "Trọng tâm",
            text: "Phân tích nghiệp vụ CNTT (ITBA), **Chuyển đổi số doanh nghiệp** và kiến trúc luồng thanh toán FinTech."
          },
          {
            label: "Kiến trúc",
            text: "Mô hình hóa vòng đời thanh toán bất đồng bộ (Webhook/IPN), máy trạng thái đơn hàng và cơ chế chống xử lý trùng (Idempotency)."
          },
          {
            label: "Dữ liệu",
            text: "Kiểm toán sổ cái đối soát đa bên, phân tích phễu chuyển đổi và thiết kế quy tắc phát hiện giao dịch bất thường bằng **SQL & Python**."
          },
          {
            label: "Kết nối",
            text: "Sẵn sàng trao đổi về cơ hội hợp tác trong mảng IT Business Analysis, Product Systems và FinTech tại Việt Nam."
          }
        ],
        exploreTitle: "Khám phá",
        explore: "Tìm hiểu [phương pháp làm việc & tư duy đặc tả](practice.html), xem chi tiết [chuỗi dự án hệ thống Ví điện tử](works.html), danh mục [kỹ năng & công cụ](stack.html) hoặc đọc các [bài viết phân tích song ngữ](notes.html).",
        reachTitle: "Liên hệ trực tiếp",
        reachLinks: [
          { label: "Email", href: "mailto:phucdat.work@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com/in/phucdatphan", external: true },
          { label: "GitHub", href: "https://github.com/phucdatphan", external: true }
        ]
      }
    },

    practice: {
      en: {
        metaTitle: "Practice & Methodology — Phan Phuc Dat",
        metaDescription: "Core IT Business Analysis directions, FinTech system invariants, and analytical methodology.",
        overline: "Practice",
        title: "Specification-driven business analysis & deterministic system design.",
        description: "Good specifications eliminate ambiguity before code is written; good data diagnostics close the loop after launch. My practice connects both ends of the software lifecycle.",
        listTitle: "Core directions",
        directions: [
          {
            number: "I",
            title: "Specification & Domain Modeling",
            question: "How do we translate ambiguous stakeholder requirements into deterministic engineering contracts?",
            detail: "Applying BABOK frameworks to structure stakeholder matrices, Business & Software Requirements Specifications (BRD/SRS), explicit order state machines, and Gherkin (Given-When-Then) acceptance criteria."
          },
          {
            number: "II",
            title: "Payment & Webhook Reliability",
            question: "What architectural invariants prevent lost orders, payload tampering, or duplicate fulfillment?",
            detail: "Decoupling untrusted browser Redirect URLs from authoritative server-to-server IPN callbacks, backed by canonical HMAC-SHA256 verification, constant-time checks, inventory locks, and idempotency guards."
          },
          {
            number: "III",
            title: "Settlement Reconciliation & Risk BI",
            question: "How do post-launch SQL diagnostics uncover silent financial drift and inform product UX?",
            detail: "Writing relational SQL pipelines (CTEs, Window Functions) and Python anomaly models to reconcile Merchant, Gateway, and Bank ledgers while isolating checkout friction and card-testing patterns."
          }
        ],
        worksTitle: "Flagship System Initiative",
        methodTitle: "Working method",
        method: [
          "Every case study begins from first principles: mapping every actor's incentives and failure modes before drawing a single wireframe or endpoint.",
          "Whenever possible, I validate specifications by building zero-dependency sandboxes, executable Postman suites, and reproducible SQLite warehouses so edge cases are observed rather than assumed."
        ],
        methodLinks: [
          { label: "Browse all system stages", href: "works.html" },
          { label: "View GitHub profile", href: "https://github.com/phucdatphan", external: true }
        ]
      },
      vi: {
        metaTitle: "Phương Pháp & Tư Duy Hệ Thống — Phan Phúc Đạt",
        metaDescription: "Các hướng tiếp cận cốt lõi trong Phân tích nghiệp vụ CNTT, thiết kế hệ thống thanh toán và phân tích dữ liệu đối soát.",
        overline: "Phương pháp",
        title: "Phân tích nghiệp vụ hướng đặc tả & thiết kế hệ thống tất định.",
        description: "Một bản đặc tả tốt triệt tiêu sự mơ hồ trước khi viết dòng code đầu tiên; một hệ thống chẩn đoán dữ liệu tốt khép kín vòng lặp cải tiến sau khi sản phẩm ra mắt. Phương pháp của tôi kết nối chặt chẽ cả hai đầu vòng đời đó.",
        listTitle: "Ba trụ cột chuyên môn",
        directions: [
          {
            number: "I",
            title: "Đặc Tả Nghiệp Vụ & Mô Hình Hóa Miền",
            question: "Làm thế nào chuyển hóa yêu cầu đa chiều từ các bên liên quan thành bản hợp đồng kỹ thuật không mơ hồ?",
            detail: "Ứng dụng khung chuẩn BABOK để xây dựng ma trận Stakeholder, tài liệu BRD/SRS, máy trạng thái (State Machine) tường minh và tiêu chí nghiệm thu Gherkin (Given-When-Then) có thể kiểm thử trực tiếp."
          },
          {
            number: "II",
            title: "Độ Tin Cậy Thanh Toán & Webhook Bất Đồng Bộ",
            question: "Những chốt chặn kiến trúc nào giúp ngăn chặn mất đơn, giả mạo gói tin hoặc xuất kho trùng lặp?",
            detail: "Tách biệt hoàn toàn luồng chuyển hướng trình duyệt (Redirect URL) khỏi luồng gọi ngầm giữa hai máy chủ (IPN Webhook), kết hợp chữ ký chuẩn hóa HMAC-SHA256, chống Timing Attack, khóa tồn kho tạm thời và khóa lũy thừa Idempotency."
          },
          {
            number: "III",
            title: "Đối Soát Quyết Toán & Phân Tích Rủi Ro",
            question: "Làm sao dùng truy vấn SQL sau ra mắt để phát hiện sai lệch dòng tiền ngầm và dẫn dắt cải tiến UX?",
            detail: "Thiết kế truy vấn SQL nâng cao (CTE, Window Functions) và kịch bản Python EDA để đối chiếu ba bên giữa Sổ đơn hàng, Log cổng ví và Sao kê ngân hàng, đồng thời bóc tách điểm nghẽn phễu thanh toán."
          }
        ],
        worksTitle: "Dự Án Hệ Thống Trọng Điểm",
        methodTitle: "Nguyên tắc thực thi",
        method: [
          "Mọi nghiên cứu tình huống đều bắt đầu từ gốc rễ: lập bản đồ quyền lợi, rủi ro và kịch bản lỗi biên của từng tác nhân trước khi vẽ wireframe hay thiết kế API.",
          "Thay vì chỉ dừng ở tài liệu lý thuyết, tôi kiểm chứng đặc tả bằng cách dựng môi trường sandbox chạy thực tế, bộ kiểm thử tự động trên Postman và kho dữ liệu SQLite tái lập được."
        ],
        methodLinks: [
          { label: "Xem toàn bộ các giai đoạn dự án", href: "works.html" },
          { label: "Xem hồ sơ GitHub", href: "https://github.com/phucdatphan", external: true }
        ]
      }
    },

    works: {
      en: {
        metaTitle: "System Works — Phan Phuc Dat",
        metaDescription: "End-to-End E-Wallet Payment System architecture, UX/UAT verification, and post-launch SQL reconciliation.",
        overline: "Works",
        title: "Selected system architectures & case studies.",
        description: "A connected multi-stage FinTech payment suite progressing from core backend architecture and BABOK specs through UX/UAT quality gates to post-launch SQL settlement reconciliation.",
        filters: {
          all: "All Stages",
          architecture: "Architecture & Spec",
          "ux-uat": "Checkout UX & UAT",
          analytics: "SQL & Risk BI"
        }
      },
      vi: {
        metaTitle: "Dự Án Hệ Thống — Phan Phúc Đạt",
        metaDescription: "Chuỗi dự án Hệ thống Thanh toán Ví điện tử đầu-cuối: Kiến trúc lõi BABOK, Thiết kế UX/UAT và Phân tích đối soát SQL.",
        overline: "Dự án",
        title: "Các kiến trúc hệ thống & nghiên cứu tình huống chọn lọc.",
        description: "Chuỗi dự án FinTech liên hoàn xuyên suốt vòng đời sản phẩm: từ đặc tả kiến trúc lõi & bảo mật (Stage I), thiết kế luồng UX & kiểm thử nghiệm thu UAT (Stage II) đến phân tích dữ liệu phễu & đối soát tài chính ba bên sau ra mắt (Stage III).",
        filters: {
          all: "Tất cả giai đoạn",
          architecture: "Kiến trúc & Đặc tả",
          "ux-uat": "Checkout UX & UAT",
          analytics: "Đối soát SQL & BI"
        }
      }
    },

    notes: {
      en: {
        metaTitle: "Field Notes — Phan Phuc Dat",
        metaDescription: "Bilingual notes on IT Business Analysis, FinTech payment architecture, and financial reconciliation.",
        overline: "Field Notes",
        title: "Notes on specifications, payment invariants, and data.",
        description: "Short essays and architectural breakdowns available in English and Vietnamese.",
        archiveTitle: "Archive"
      },
      vi: {
        metaTitle: "Ghi Chép Chuyên Môn — Phan Phúc Đạt",
        metaDescription: "Các bài viết phân tích về IT Business Analysis, kiến trúc cổng thanh toán FinTech và đối soát dữ liệu tài chính.",
        overline: "Ghi chép",
        title: "Góc nhìn về đặc tả nghiệp vụ, kiến trúc thanh toán và dữ liệu.",
        description: "Các bài phân tích ngắn đúc kết từ quá trình thiết kế hệ thống và kiểm thử thực tế.",
        archiveTitle: "Danh mục bài viết"
      }
    },

    stack: {
      en: {
        metaTitle: "Stack & Tooling — Phan Phuc Dat",
        metaDescription: "Business analysis frameworks, backend prototyping languages, analytical SQL, and product tooling.",
        overline: "Stack",
        title: "Methods, languages, and working tools.",
        description: "A curated set of analysis standards, query languages, and engineering tools used across my system specifications and prototypes.",
        sectionTitle: "Domains & Tooling",
        categories: [
          {
            code: "BA · Specs",
            title: "Business Analysis & Domain Modeling",
            description: "Frameworks and notations for eliciting requirements, mapping workflows, and defining unambiguous state transitions.",
            items: ["BABOK", "BRD / SRS", "Agile / Scrum", "Gherkin (Given-When-Then)", "State Machines", "BPMN Workflows", "Stakeholder Matrix"]
          },
          {
            code: "Data · SQL",
            title: "Relational Diagnostics & Analytics",
            description: "Querying multi-table operational warehouses, modeling conversion funnels, and auditing financial settlements.",
            items: ["SQL (CTEs & Window Functions)", "SQLite", "Python", "Pandas", "NumPy", "Matplotlib", "Anomaly & Funnel EDA"]
          },
          {
            code: "Core · Dev",
            title: "Backend Prototyping & API Architecture",
            description: "Building lightweight, deterministic sandboxes to validate webhook lifecycles, cryptographic signatures, and idempotency.",
            items: ["Node.js", "FastAPI", "HMAC-SHA256", "REST Webhooks / IPN", "C / C++", "HTML / CSS", "JavaScript"]
          },
          {
            code: "UX · QA",
            title: "Interface Design, Verification & Collaboration",
            description: "Wireframing interactive user journeys, executing UAT suites, and maintaining traceable engineering documentation.",
            items: ["Figma", "Mermaid.js", "Postman", "UAT Test Matrix", "Jira", "Airtable", "Notion", "Git & GitHub", "Google Cloud Platform", "VS Code"]
          }
        ]
      },
      vi: {
        metaTitle: "Phương Pháp & Công Cụ — Phan Phúc Đạt",
        metaDescription: "Khung phân tích nghiệp vụ BABOK, truy vấn SQL phân tích, ngôn ngữ lập trình mẫu và công cụ thiết kế kiểm thử.",
        overline: "Công cụ",
        title: "Phương pháp luận, ngôn ngữ truy vấn và bộ công cụ thực thi.",
        description: "Tập hợp các tiêu chuẩn phân tích nghiệp vụ, ngôn ngữ dữ liệu và công cụ kỹ thuật tôi sử dụng trực tiếp trong các hồ sơ hệ thống.",
        sectionTitle: "Nhóm Năng Lực & Công Cụ",
        categories: [
          {
            code: "BA · Đặc tả",
            title: "Phân Tích Nghiệp Vụ & Mô Hình Hóa Quy Trình",
            description: "Các khung chuẩn và ký hiệu dùng để khai thác yêu cầu, phân tích luồng As-Is / To-Be và định nghĩa máy trạng thái chặt chẽ.",
            items: ["BABOK", "BRD / SRS", "Agile / Scrum", "Gherkin (Given-When-Then)", "State Machines", "BPMN Workflows", "Stakeholder Matrix"]
          },
          {
            code: "Dữ liệu · SQL",
            title: "Truy Vấn Dữ Liệu Quan Hệ & Phân Tích Chẩn Đoán",
            description: "Khai thác kho dữ liệu đa bảng, đo lường phễu chuyển đổi, đối soát tài chính ba bên và phân tích quy luật bất thường.",
            items: ["SQL (CTEs & Window Functions)", "SQLite", "Python", "Pandas", "NumPy", "Matplotlib", "Phân tích Phễu & Gian lận"]
          },
          {
            code: "Lõi · Backend",
            title: "Xây Dựng Bản Mẫu Kỹ Thuật & Kiến Trúc API",
            description: "Phát triển các môi trường giả lập độc lập để kiểm chứng luồng Webhook/IPN, bảo mật chữ ký số và khóa chống trùng lặp.",
            items: ["Node.js", "FastAPI", "HMAC-SHA256", "REST Webhooks / IPN", "C / C++", "HTML / CSS", "JavaScript"]
          },
          {
            code: "UX · Kiểm thử",
            title: "Thiết Kế Giao Diện, Nghiệm Thu UAT & Quản Trị Dự Án",
            description: "Thiết kế wireframe tương tác, xây dựng kịch bản kiểm thử API/UAT và quản lý tài liệu sản phẩm xuyên suốt các sprint.",
            items: ["Figma", "Mermaid.js", "Postman", "Ma trận UAT", "Jira", "Airtable", "Notion", "Git & GitHub", "Google Cloud Platform", "VS Code"]
          }
        ]
      }
    }
  },

  works: [
    {
      id: "stage-1",
      category: "architecture",
      domain: "Node.js · BABOK · FinTech",
      codeUrl: "https://github.com/phucdatphan/e-wallet-payment-simulator",
      tags: ["BABOK", "BRD / SRS", "Node.js", "HMAC-SHA256", "Idempotency", "State Machine"],
      en: {
        stage: "Stage I",
        status: "Core & Security Spec",
        title: "E-Wallet Payment Simulator & BABOK System Specification",
        abstract: "Dual-server Merchant and Payment Gateway sandbox paired with full BABOK documentation to model payment state integrity, cryptographic verification, and asynchronous webhook reliability.",
        mechanism: "Decouples untrusted client Redirect URLs from authoritative server-to-server IPN callbacks, enforcing canonical HMAC-SHA256 signature verification, constant-time checks, inventory reservation locks, and idempotency guards."
      },
      vi: {
        stage: "Giai đoạn I",
        status: "Kiến trúc lõi & Đặc tả bảo mật",
        title: "Hệ Thống Giả Lập Cổng Thanh Toán Ví Điện Tử & Hồ Sơ Đặc Tả BABOK",
        abstract: "Môi trường sandbox hai máy chủ độc lập (Merchant & Payment Gateway) đi kèm bộ tài liệu đặc tả chuẩn BABOK nhằm mô hình hóa tính toàn vẹn trạng thái thanh toán, xác thực chữ ký mật mã và xử lý bất đồng bộ.",
        mechanism: "Tách biệt hoàn toàn Return URL trên trình duyệt khỏi luồng gọi ngầm IPN giữa hai máy chủ; áp dụng chuẩn hóa chuỗi ký HMAC-SHA256, so sánh thời gian hằng số, khóa giữ tồn kho và cơ chế lũy thừa Idempotency chống xử lý trùng."
      }
    },
    {
      id: "stage-2",
      category: "ux-uat",
      domain: "Figma · Agile · Postman",
      codeUrl: "https://github.com/phucdatphan/e-wallet-checkout-ux-uat",
      tags: ["Figma Wireframes", "Agile / Scrum", "Gherkin AC", "UAT Matrix", "Postman", "Active Polling"],
      en: {
        stage: "Stage II",
        status: "Checkout UX & UAT",
        title: "Pre-Launch Checkout UX, Gherkin Stories & UAT Verification Suite",
        abstract: "Translates core payment specifications into interactive checkout wireframes, developer-ready Agile user stories with Given-When-Then criteria, and an end-to-end UAT & Postman regression suite.",
        mechanism: "Introduces active status-polling fallback (/pay/query) during gateway webhook latency so end users experience calm, deterministic checkout feedback without relaxing backend security."
      },
      vi: {
        stage: "Giai đoạn II",
        status: "Thiết kế UX & Kiểm thử UAT",
        title: "Thiết Kế Luồng Trải Nghiệm Checkout, User Stories Gherkin & Bộ Nghiệm Thu UAT",
        abstract: "Chuyển hóa đặc tả kỹ thuật ở Giai đoạn I thành bộ wireframe tương tác trên Figma, danh mục User Stories chuẩn Given-When-Then cho đội phát triển cùng bộ kịch bản kiểm thử UAT và Postman.",
        mechanism: "Thiết kế cơ chế chủ động truy vấn trạng thái đơn (/pay/query) khi gói tin Webhook IPN bị trễ giờ cao điểm, giúp người dùng nhận phản hồi mượt mà trên giao diện mà không làm giảm tiêu chuẩn bảo mật phía máy chủ."
      }
    },
    {
      id: "stage-3",
      category: "analytics",
      domain: "SQL · Python · Risk Analytics",
      codeUrl: "https://github.com/phucdatphan/e-wallet-post-launch-analytics",
      tags: ["SQL CTEs", "Window Functions", "Python", "SQLite", "Settlement Recon", "Anomaly EDA"],
      en: {
        stage: "Stage III",
        status: "Settlement Recon & BI",
        title: "Post-Launch Checkout Funnel, Multi-Party Reconciliation & Anomaly BI",
        abstract: "Relational SQLite warehouse and Python diagnostic suite auditing post-launch checkout conversion friction, three-way bank settlement discrepancies, and real-world card fraud patterns.",
        mechanism: "Cross-joins Merchant Orders, Gateway Transaction Logs, and Bank Settlement statements via SQL CTEs and Window Functions to surface AMOUNT_MISMATCH and MISSING_IPN drift alongside anomaly rules."
      },
      vi: {
        stage: "Giai đoạn III",
        status: "Đối soát quyết toán & Phân tích rủi ro",
        title: "Phân Tích Phễu Chuyển Đổi Sau Ra Mắt, Đối Soát Ba Bên & Quy Tắc Chống Gian Lận",
        abstract: "Kho dữ liệu quan hệ SQLite kết hợp bộ truy vấn phân tích SQL và Python EDA nhằm chẩn đoán điểm rơi phễu thanh toán, truy vết sai lệch quyết toán ngân hàng và kiểm thử quy tắc phát hiện giao dịch bất thường.",
        mechanism: "Kết nối chéo ba nguồn dữ liệu (Đơn hàng Merchant, Nhật ký Cổng ví và Sao kê Ngân hàng) bằng SQL CTE & Window Functions để bóc tách tức thì các ca lệch tiền (AMOUNT_MISMATCH) hoặc thiếu callback (MISSING_IPN)."
      }
    }
  ],

  dossiers: {
    "stage-1": {
      codeUrl: "https://github.com/phucdatphan/e-wallet-payment-simulator",
      en: {
        overline: "System Dossier · Stage I",
        title: "E-Wallet Payment Simulator & BABOK Architecture",
        lead: "Designing a deterministic Merchant and Payment Gateway sandbox from first principles to prove payment correctness under network drops, replay retries, and payload tampering.",
        meta: "Architecture & Security · Node.js & BABOK",
        sections: [
          {
            heading: "Problem Statement",
            paragraphs: [
              "In real-world E-Wallet integrations (such as MoMo or ZaloPay), subtle specification gaps routinely cause severe financial bugs: orders marked unpaid when a customer closes the browser before redirecting, forged callback payloads altering transaction amounts, or duplicate fulfillment triggered when gateways retry timed-out webhooks."
            ],
            callout: {
              title: "Architectural Invariant",
              text: "Browser Return URLs are strictly informational UI transitions. Only an authenticated, canonical HMAC-verified, idempotent server-to-server IPN callback may transition an order from PENDING to SUCCESS."
            }
          },
          {
            heading: "BABOK Specification & State Lifecycle",
            paragraphs: [
              "Before writing application code, the system was specified in a structured Business Analysis dossier covering stakeholder concerns across Customer, Business, Accounting, Compliance, Engineering, and Support teams, alongside explicit state machine rules:"
            ],
            bullets: [
              "Order Lifecycle State Machine: Strict unidirectional transitions from DRAFT to PENDING, resolving into terminal states SUCCESS, FAILED, or EXPIRED.",
              "Inventory Reservation Hold: Locking item stock upon checkout initiation and automatically releasing unfulfilled holds upon session expiration to prevent overselling.",
              "Three-Layer Callback Guard: Validating cryptographic signature integrity, order amount parity, and idempotency keys prior to ledger mutation."
            ],
            codeLang: "javascript · canonical hmac & timing-safe verification",
            code: `function verifySignature(payload, receivedSig, secretKey) {
  const canonical = Object.keys(payload)
    .sort()
    .map((k) => \`\${k}=\${payload[k]}\`)
    .join("&");
  const expected = crypto
    .createHmac("sha256", secretKey)
    .update(canonical)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(receivedSig, "hex")
  );
}`
          }
        ]
      },
      vi: {
        overline: "Hồ Sơ Hệ Thống · Giai Đoạn I",
        title: "Giả Lập Cổng Thanh Toán Ví Điện Tử & Đặc Tả BABOK",
        lead: "Xây dựng môi trường sandbox hai chiều giữa Merchant và Payment Gateway kèm hồ sơ đặc tả BABOK nhằm đảm bảo tính toàn vẹn trạng thái đơn hàng trước lỗi mạng, tấn công giả mạo và gọi lặp Webhook.",
        meta: "Kiến Trúc & Bảo Mật · Node.js & BABOK",
        sections: [
          {
            heading: "Bài Toán Nghiệp Vụ Cốt Lõi",
            paragraphs: [
              "Khi tích hợp các cổng ví điện tử thực tế (như MoMo, ZaloPay), việc thiếu đặc tả chặt chẽ ở các luồng biên thường dẫn đến rủi ro tài chính nghiêm trọng: khách đã trừ tiền nhưng tắt trình duyệt trước khi Return URL kịp chuyển hướng, kẻ gian can thiệp sửa số tiền trong gói tin, hoặc Gateway gửi lặp IPN làm xuất kho hai lần."
            ],
            callout: {
              title: "Nguyên Tắc Bất Biến",
              text: "Return URL trên trình duyệt chỉ phục vụ hiển thị giao diện. Duy nhất luồng gọi ngầm IPN giữa hai máy chủ (đã qua kiểm tra chữ ký HMAC-SHA256 và khóa Idempotency) mới có quyền chốt trạng thái đơn sang SUCCESS."
            }
          },
          {
            heading: "Đặc Tả BABOK & Vòng Đời Trạng Thái",
            paragraphs: [
              "Hệ thống được đặc tả đầy đủ từ ma trận các bên liên quan (Khách hàng, Kinh doanh, Kế toán, Pháp chế, Kỹ thuật, CSKH) đến sơ đồ trạng thái đơn hàng chặt chẽ:"
            ],
            bullets: [
              "State Machine một chiều: Quản lý vòng đời từ DRAFT sang PENDING và kết thúc dứt khoát tại SUCCESS, FAILED hoặc EXPIRED.",
              "Cơ chế tạm giữ tồn kho: Khóa tồn kho ngay khi khởi tạo phiên thanh toán và tự động giải phóng khi hết hạn để chống bán lố (overselling).",
              "Chốt chặn bảo mật ba lớp: Chuẩn hóa chuỗi Canonical, so sánh chữ ký chống Timing Attack và kiểm tra đối khớp số tiền thanh toán."
            ],
            codeLang: "javascript · xác thực chữ ký hmac an toàn",
            code: `function verifySignature(payload, receivedSig, secretKey) {
  const canonical = Object.keys(payload)
    .sort()
    .map((k) => \`\${k}=\${payload[k]}\`)
    .join("&");
  const expected = crypto
    .createHmac("sha256", secretKey)
    .update(canonical)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(receivedSig, "hex")
  );
}`
          }
        ]
      }
    },

    "stage-2": {
      codeUrl: "https://github.com/phucdatphan/e-wallet-checkout-ux-uat",
      en: {
        overline: "System Dossier · Stage II",
        title: "Pre-Launch Checkout UX, Agile Stories & UAT Suite",
        lead: "Bridging backend payment architecture and human interaction through Figma checkout flows, deterministic Given-When-Then stories, and rigorous UAT verification.",
        meta: "Checkout UX & Quality Gates · Figma & Postman",
        sections: [
          {
            heading: "Designing for Asynchronous Uncertainty",
            paragraphs: [
              "Asynchronous payment callbacks create an inherent UX tension: a user scans a QR code and sees money deducted in their wallet app, yet peak-hour network latency may delay the webhook reaching the merchant server."
            ],
            callout: {
              title: "UX & System Alignment",
              text: "Rather than displaying a premature failure screen or forcing manual page refreshes, active status polling queries the gateway status endpoint gracefully while keeping the user informed."
            }
          },
          {
            heading: "Agile Specifications & Pre-Launch Verification",
            paragraphs: [
              "Every checkout screen and API edge case was decomposed into developer-ready specifications and regression tests:"
            ],
            bullets: [
              "Interactive Wireframes: End-to-end Figma screens covering cart review, wallet selection, QR countdown timer, pending confirmation, and guided retry.",
              "Deterministic User Stories: Structured Gherkin (Given-When-Then) acceptance criteria eliminating ambiguity across happy paths and failure recovery.",
              "UAT & Postman Suite: Comprehensive test scenarios validating expired sessions, tampered signatures, duplicate IPN deliveries, and insufficient wallet balance."
            ],
            codeLang: "gherkin · asynchronous polling acceptance criteria",
            code: `Scenario: Graceful recovery when IPN callback is delayed
  Given the customer has scanned the QR code for a PENDING order
  And the asynchronous IPN webhook has not yet arrived at Merchant
  When the checkout screen enters the confirmation waiting state
  Then the client polls "/v2/gateway/pay/query" at regular intervals
  And transitions cleanly to the receipt view once settlement is confirmed`
          }
        ]
      },
      vi: {
        overline: "Hồ Sơ Hệ Thống · Giai Đoạn II",
        title: "Thiết Kế Trải Nghiệm Checkout, User Stories & Bộ Kiểm Thử UAT",
        lead: "Chuyển hóa kiến trúc lõi thành luồng giao diện thân thiện trên Figma, tài liệu Given-When-Then rõ ràng cho lập trình viên và bộ kịch bản nghiệm thu UAT trước giờ vận hành.",
        meta: "UX & Kiểm Thử Nghiệm Thu · Figma & Postman",
        sections: [
          {
            heading: "Giải Quyết Độ Trễ Bất Đồng Bộ Trên Giao Diện",
            paragraphs: [
              "Trong thanh toán ví điện tử, khách hàng thường đã thấy ứng dụng ví báo trừ tiền nhưng giờ cao điểm khiến gói tin IPN về tới hệ thống cửa hàng chậm vài giây. Nếu giao diện không xử lý khéo, khách hàng dễ hoang mang bấm thanh toán lại hoặc thoát trang."
            ],
            callout: {
              title: "Đồng Bộ UX & Hệ Thống",
              text: "Thay vì báo lỗi sớm, giao diện chuyển sang trạng thái chờ xác nhận bình tĩnh kết hợp cơ chế chủ động truy vấn trạng thái đơn (/pay/query) định kỳ."
            }
          },
          {
            heading: "Đặc Tả Agile & Nghiệm Thu UAT",
            paragraphs: [
              "Toàn bộ yêu cầu nghiệp vụ được cụ thể hóa thành bộ tài liệu thực thi đồng bộ giữa BA, Designer, Dev và QA:"
            ],
            bullets: [
              "Luồng Wireframes trên Figma: Bao phủ trọn vẹn từ giỏ hàng, chọn ví, quét mã QR đếm ngược, chờ xác nhận mạng trễ đến màn hình biên lai hoặc thử lại.",
              "User Stories chuẩn Gherkin: Viết theo cấu trúc Given-When-Then giúp đội phát triển và kiểm thử hiểu thống nhất từng điều kiện biên.",
              "Ma trận UAT & Postman Collection: Kiểm thử toàn diện cả luồng chuẩn lẫn các ca lỗi hết hạn phiên, sai chữ ký số, gọi trùng callback và không đủ số dư."
            ],
            codeLang: "gherkin · tiêu chí nghiệm thu xử lý trễ mạng",
            code: `Scenario: Xử lý mượt khi gói tin IPN về trễ giờ cao điểm
  Given khách hàng đã quét mã QR cho đơn hàng đang ở trạng thái PENDING
  And hệ thống Merchant chưa nhận được gói tin IPN từ cổng ví
  When màn hình thanh toán chuyển sang trạng thái chờ xác nhận
  Then giao diện chủ động truy vấn "/v2/gateway/pay/query" định kỳ
  And tự động mở trang biên lai ngay khi kết quả thanh toán hoàn tất`
          }
        ]
      }
    },

    "stage-3": {
      codeUrl: "https://github.com/phucdatphan/e-wallet-post-launch-analytics",
      en: {
        overline: "System Dossier · Stage III",
        title: "Post-Launch Funnel, Settlement Reconciliation & Anomaly BI",
        lead: "Auditing operational health after go-live through SQL CTEs, Window Functions, multi-party ledger reconciliation, and Python payment anomaly diagnostics.",
        meta: "SQL & Python Diagnostics · Financial Reconciliation",
        sections: [
          {
            heading: "Why Two-Way Checks Are Not Enough",
            paragraphs: [
              "After launch, product and finance teams face two distinct questions: where are users abandoning the checkout funnel, and does every settled bank transfer match both our internal order table and the payment gateway's transaction log?"
            ],
            callout: {
              title: "Three-Way Financial Reconciliation",
              text: "Comparing Merchant Orders, Gateway Logs, and Bank Settlement statements side by side exposes silent discrepancies—such as missing webhooks on settled charges (MISSING_IPN) or net settlement mismatches (AMOUNT_MISMATCH)."
            }
          },
          {
            heading: "Analytical Pipeline & Product Feedback Loop",
            paragraphs: [
              "Using SQLite, analytical SQL queries, and Python exploratory scripts, post-launch telemetry is turned directly into engineering backlog items:"
            ],
            bullets: [
              "Checkout Funnel Diagnostics: Measuring step-by-step progression from order creation to QR display and final settlement to motivate mobile deep-link UX improvements.",
              "Cross-Ledger Settlement Audit: Using CTEs and Window Functions to isolate reconciliation drift and settlement cutoff boundary effects.",
              "Real-World Anomaly Benchmark: Evaluating real card transaction distributions in Python to formulate zero-amount card-testing and off-peak risk rules."
            ],
            codeLang: "sql · three-way settlement reconciliation pattern",
            code: `WITH recon_audit AS (
  SELECT
    o.order_id,
    o.status          AS merchant_status,
    o.amount          AS order_amount,
    g.ipn_status      AS gateway_ipn_status,
    b.settled_amount  AS bank_settled_amount,
    CASE
      WHEN b.order_id IS NOT NULL AND o.status <> 'Paid' THEN 'MISSING_IPN'
      WHEN b.settled_amount <> g.expected_net_amount     THEN 'AMOUNT_MISMATCH'
      ELSE 'MATCHED'
    END AS recon_flag
  FROM merchant_orders o
  LEFT JOIN gateway_transactions g ON o.order_id = g.order_id
  LEFT JOIN bank_settlements b     ON o.order_id = b.order_id
)
SELECT * FROM recon_audit WHERE recon_flag <> 'MATCHED';`
          }
        ]
      },
      vi: {
        overline: "Hồ Sơ Hệ Thống · Giai Đoạn III",
        title: "Phân Tích Phễu Sau Ra Mắt, Đối Soát Ba Bên & Phát Hiện Bất Thường",
        lead: "Đo lường sức khỏe vận hành của hệ thống thanh toán bằng SQL (CTE, Window Functions), đối soát tài chính ba bên và phân tích quy luật giao dịch bất thường bằng Python.",
        meta: "Phân Tích SQL & Python · Đối Soát Tài Chính",
        sections: [
          {
            heading: "Vì Sao Phải Đối Soát Ba Bên?",
            paragraphs: [
              "Sau khi sản phẩm vận hành thực tế, người làm ITBA cần trả lời chính xác hai câu hỏi cho khối Sản phẩm và Kế toán: khách hàng đang rời bỏ phễu thanh toán ở bước nào, và tiền thực nhận trên sao kê ngân hàng có khớp tuyệt đối với sổ đơn hàng lẫn nhật ký cổng ví hay không?"
            ],
            callout: {
              title: "Đối Soát Tài Chính Ba Bên",
              text: "Đặt cạnh nhau Sổ Đơn Hàng (Merchant), Nhật Ký Cổng Ví (Gateway) và Sao Kê Ngân Hàng (Bank Settlement) giúp phát hiện tức thì các ca tiền đã về nhưng thiếu callback (MISSING_IPN) hoặc lệch số tiền quyết toán (AMOUNT_MISMATCH)."
            }
          },
          {
            heading: "Chu Trình Phân Tích & Cải Tiến Sản Phẩm",
            paragraphs: [
              "Kết hợp kho dữ liệu SQLite và Python EDA để khép kín vòng lặp phát triển sản phẩm:"
            ],
            bullets: [
              "Phân tích phễu chuyển đổi (Checkout Funnel): Xác định điểm rơi giữa bước tạo đơn, mở mã QR và hoàn tất thanh toán nhằm đề xuất cơ chế Deep-link mở thẳng ứng dụng ví.",
              "Truy vết lệch đối soát bằng SQL: Ứng dụng CTE và Window Functions để tách bạch lỗi kỹ thuật và hiện tượng lệch giờ khóa sổ cuối ngày.",
              "Kiểm thử quy tắc chống gian lận: Phân tích dữ liệu giao dịch thẻ thực tế bằng Python để thiết lập bộ quy tắc cảnh báo hành vi thử thẻ giá trị rỗng và khung giờ rủi ro."
            ],
            codeLang: "sql · truy vấn đối soát tài chính ba bên",
            code: `WITH recon_audit AS (
  SELECT
    o.order_id,
    o.status          AS merchant_status,
    o.amount          AS order_amount,
    g.ipn_status      AS gateway_ipn_status,
    b.settled_amount  AS bank_settled_amount,
    CASE
      WHEN b.order_id IS NOT NULL AND o.status <> 'Paid' THEN 'MISSING_IPN'
      WHEN b.settled_amount <> g.expected_net_amount     THEN 'AMOUNT_MISMATCH'
      ELSE 'MATCHED'
    END AS recon_flag
  FROM merchant_orders o
  LEFT JOIN gateway_transactions g ON o.order_id = g.order_id
  LEFT JOIN bank_settlements b     ON o.order_id = b.order_id
)
SELECT * FROM recon_audit WHERE recon_flag <> 'MATCHED';`
          }
        ]
      }
    }
  },

  notes: [
    {
      id: "redirect-vs-ipn",
      number: "01",
      category: { en: "Payment Architecture", vi: "Kiến Trúc Thanh Toán" },
      en: {
        title: "Why Browser Redirect URLs Cannot Finalize Payment State",
        summary: "Separating user-facing browser navigation from authoritative server-to-server webhook settlement in E-Wallet integrations.",
        meta: "Field Note 01 · Payment Systems",
        paragraphs: [
          "When integrating an E-Wallet gateway for the first time, it is tempting to update an order's status inside the Return URL handler—the page the user's browser is redirected to after paying. It feels immediate and simple during happy-path testing.",
          "In production, however, the user's browser is an unreliable transport channel. Mobile networks drop inside elevators, users swipe apps closed the moment they see a wallet deduction notification, and query parameters in browser URLs can be inspected or replayed.",
          "A resilient payment specification treats the Return URL and the Instant Payment Notification (IPN) webhook as two distinct responsibilities: the Return URL renders a calm, read-only status view for the human, while only the cryptographically signed, idempotent server-to-server IPN mutates the financial ledger."
        ]
      },
      vi: {
        title: "Vì Sao Không Thể Dùng Redirect URL Để Chốt Đơn Thanh Toán?",
        summary: "Phân tách rạch ròi giữa luồng điều hướng trình duyệt của người dùng và luồng xác nhận ngầm giữa hai máy chủ (IPN Webhook).",
        meta: "Ghi Chép 01 · Kiến Trúc Thanh Toán",
        paragraphs: [
          "Khi mới thiết kế tích hợp cổng ví điện tử, một sai lầm phổ biến là đặt logic cập nhật trạng thái đơn hàng ngay tại Return URL — trang mà trình duyệt khách hàng quay về sau khi quét mã. Khi kiểm thử trên mạng ổn định, mọi thứ trông có vẻ chạy mượt.",
          "Nhưng trong môi trường thực tế, trình duyệt của người dùng là kênh truyền tải kém tin cậy nhất: khách có thể rớt mạng 4G trong thang máy, vuốt tắt tab ngay khi thấy thông báo trừ tiền trên điện thoại, hoặc can thiệp tham số trên thanh địa chỉ.",
          "Một bản đặc tả hệ thống chuẩn mực luôn tách biệt hai vai trò: Return URL chỉ dùng để hiển thị trạng thái thân thiện cho người dùng cuối, còn quyền thay đổi trạng thái đơn hàng trong cơ sở dữ liệu bắt buộc thuộc về gói tin IPN gọi trực tiếp giữa máy chủ Ví và máy chủ Cửa hàng."
        ]
      }
    },
    {
      id: "gherkin-for-async-systems",
      number: "02",
      category: { en: "Business Analysis", vi: "Phân Tích Nghiệp Vụ" },
      en: {
        title: "Writing Deterministic Given-When-Then Criteria for Async Workflows",
        summary: "How structured Gherkin scenarios bridge business analysts, frontend designers, backend engineers, and QA testers.",
        meta: "Field Note 02 · Specification Craft",
        paragraphs: [
          "Ambiguity rarely hides in the happy path; it hides in timeouts, duplicate retries, and out-of-order events. Prose requirements like 'the system should handle slow callbacks gracefully' leave engineers guessing what exact state transition or UI feedback is expected.",
          "Expressing asynchronous workflows in Gherkin (Given-When-Then) forces every precondition, trigger, and observable postcondition into the open: what state the order starts in, whether stock is still locked, what polling endpoint the client invokes, and which terminal state wins if an expiration job races with a late webhook.",
          "When acceptance criteria are written at this level of precision, each scenario translates directly into both a developer implementation checklist and an executable UAT test case."
        ]
      },
      vi: {
        title: "Viết Tiêu Chí Nghiệm Thu Given-When-Then Cho Luồng Bất Đồng Bộ",
        summary: "Cách đặc tả kịch bản Gherkin giúp xóa bỏ khoảng trống hiểu lầm giữa BA, Thiết kế, Lập trình viên và Kiểm thử.",
        meta: "Ghi Chép 02 · Nghệ Thuật Đặc Tả",
        paragraphs: [
          "Sự mơ hồ trong dự án phần mềm hiếm khi nằm ở luồng thành công; nó luôn ẩn nấp ở các tình huống hết hạn phiên, mạng trễ hoặc gói tin đến lệch thứ tự. Những câu mô tả chung chung như 'hệ thống cần xử lý mượt khi mạng chậm' khiến lập trình viên phải tự suy đoán hành vi.",
          "Việc viết tiêu chí nghiệm thu theo cấu trúc Given-When-Then buộc người làm BA phải làm rõ từng tiền điều kiện, sự kiện kích hoạt và kết quả đầu ra: đơn đang ở trạng thái nào, kho còn giữ hay đã nhả, giao diện gọi API truy vấn nào và trạng thái nào được ưu tiên nếu tiến trình quét hết hạn chạy song song với callback đến muộn.",
          "Khi đặc tả đạt độ chính xác này, mỗi kịch bản Given-When-Then tự động trở thành cầu nối một-một sang cả code logic lẫn kịch bản kiểm thử UAT."
        ]
      }
    },
    {
      id: "three-way-reconciliation",
      number: "03",
      category: { en: "Data & Finance", vi: "Dữ Liệu & Đối Soát" },
      en: {
        title: "Multi-Party Financial Settlement Reconciliation from First Principles",
        summary: "Structuring SQL audits across Merchant databases, Gateway logs, and Bank settlement statements.",
        meta: "Field Note 03 · Financial Data Diagnostics",
        paragraphs: [
          "An order marked 'Paid' in an application database is a promise, not cash in the bank. Between checkout and actual bank settlement sit gateway processing logs, merchant discount fees, and daily settlement cutoff windows.",
          "Two-way checks (comparing only Merchant vs. Gateway) miss settlement fee discrepancies, while comparing only Merchant vs. Bank obscures whether an anomaly originated from a dropped webhook or a gateway fee calculation rule.",
          "Modeling a three-way SQL reconciliation pipeline—joining Merchant Orders, Gateway Logs, and Bank Settlements—allows analysts to classify every discrepancy deterministically and distinguish true defects from T+1 cutoff timing."
        ]
      },
      vi: {
        title: "Tư Duy Đối Soát Tài Chính Ba Bên Từ Gốc Rễ",
        summary: "Thiết kế truy vấn SQL đối chiếu chéo giữa Cơ sở dữ liệu đơn hàng, Nhật ký cổng thanh toán và Sao kê ngân hàng.",
        meta: "Ghi Chép 03 · Phân Tích Dữ Liệu Tài Chính",
        paragraphs: [
          "Một đơn hàng mang trạng thái 'Đã thanh toán' trong cơ sở dữ liệu ứng dụng mới chỉ là ghi nhận kỹ thuật, chưa phải dòng tiền thực về tài khoản ngân hàng. Giữa hai đầu đó còn có nhật ký xử lý của cổng ví, biểu phí chiết khấu và thời điểm khóa sổ quyết toán hằng ngày.",
          "Nếu chỉ đối soát hai bên (Cửa hàng với Cổng ví), ta dễ bỏ sót chênh lệch tiền thực nhận tại ngân hàng; ngược lại nếu chỉ so Cửa hàng với Ngân hàng, ta khó truy nguyên lỗi nằm ở đứt gãy IPN hay công thức trừ phí.",
          "Thiết kế truy vấn đối soát ba bên bằng SQL giúp phân loại chính xác từng bản ghi lệch, tách bạch rõ ràng giữa lỗi rớt gói tin thực sự và hiện tượng giao dịch vắt qua mốc khóa sổ cuối ngày."
        ]
      }
    }
  ]
};
