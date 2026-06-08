const modal = document.getElementById("diagram-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalPlaceholder = document.getElementById("modal-placeholder");
const modalDownload = document.getElementById("modal-download");
const modalClose = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");

const diagrams = {
  architecture: {
    title: "System Architecture Diagram",
    src: "assets/diagrams/architecture.png",
  },
  "ar-workflow": {
    title: "AR Workflow Diagram",
    src: "assets/diagrams/ar-workflow.png",
  },
  "vuforia-flow": {
    title: "Vuforia Detection Flow",
    src: "assets/diagrams/vuforia-flow.png",
  },
  components: {
    title: "Application Component Diagram",
    src: "assets/diagrams/components.svg",
  },
};

document.querySelectorAll(".view-diagram").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.getAttribute("data-diagram");
    const data = diagrams[type];

    modalTitle.innerText = data.title;

    // Reset modal state
    modalImage.style.display = "none";
    modalPlaceholder.style.display = "none";

    const componentsSvg = document.getElementById("svg-components");
    if (componentsSvg) componentsSvg.style.display = "none";

    if (type === "components") {
      if (componentsSvg) {
        componentsSvg.style.display = "block";
        modalPlaceholder.style.display = "none";

        // SVG Download logic
        const svgData = new XMLSerializer().serializeToString(componentsSvg);
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);
        modalDownload.href = svgUrl;
        modalDownload.download = `shilpa_components.svg`;
      }
    } else {
      // Standard image handling
      const cacheBust = `?t=${new Date().getTime()}`;
      modalImage.src = data.src + cacheBust;
      modalDownload.href = data.src;
      modalDownload.download = data.src.split("/").pop();

      modalImage.onload = () => {
        modalImage.style.display = "block";
        modalPlaceholder.style.display = "none";
      };
      modalImage.onerror = () => {
        modalImage.style.display = "none";
        modalPlaceholder.style.display = "block";
      };
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

const closeModal = () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
};

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// Media Toggle Logic
const mediaToggle = document.getElementById("media-view-toggle");
const labelApp = document.getElementById("label-app");
const labelWireframes = document.getElementById("label-wireframes");
const toggleableImages = document.querySelectorAll(".toggleable-img");

if (mediaToggle) {
  mediaToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      // Switch to Wireframes
      labelApp.classList.remove("active");
      labelWireframes.classList.add("active");

      toggleableImages.forEach((img) => {
        const wireframeSrc = img.getAttribute("data-wireframe");
        if (wireframeSrc) {
          img.src = wireframeSrc;
        }
      });
    } else {
      // Switch to App Screenshots
      labelWireframes.classList.remove("active");
      labelApp.classList.add("active");

      toggleableImages.forEach((img) => {
        const screenshotSrc = img.getAttribute("data-screenshot");
        if (screenshotSrc) {
          img.src = screenshotSrc;
        }
      });
    }
  });
}

// Interactive Simulator Logic
const simulatorImg = document.getElementById("simulator-img");
const hotspotsContainer = document.getElementById("hotspots-container");
const simulatorHome = document.getElementById("simulator-home");

const appFlow = {
  splash: {
    screenshot: "assets/screenshots/screen3.jpg",
    wireframe: "assets/wireframes/screen3.png",
    hotspots: [
      { top: "0%", left: "0%", width: "100%", height: "100%", target: "menu" }
    ]
  },
  menu: {
    screenshot: "assets/screenshots/screen2.jpg",
    wireframe: "assets/wireframes/screen2.png",
    hotspots: [
      { top: "30%", left: "10%", width: "80%", height: "12%", target: "lesson1" },
      { top: "45%", left: "10%", width: "80%", height: "12%", target: "lesson2" },
      { top: "58%", left: "10%", width: "80%", height: "12%", target: "lesson3" },
      { top: "72%", left: "10%", width: "80%", height: "12%", target: "games" }
    ]
  },
  lesson1: {
    screenshot: "assets/screenshots/screen1.jpg",
    wireframe: "assets/wireframes/screen1.png",
    hotspots: [
      { top: "48%", left: "12%", width: "76%", height: "8%", target: "arview" },
      { top: "2%", left: "5%", width: "15%", height: "10%", target: "menu" }
    ]
  },
  lesson2: {
    screenshot: "assets/screenshots/screen6.jpg",
    wireframe: "assets/wireframes/screen6.png",
    hotspots: [
      { top: "80%", left: "18%", width: "64%", height: "8%", target: "arview" },
      { top: "2%", left: "5%", width: "15%", height: "10%", target: "menu" }
    ]
  },
  lesson3: {
    screenshot: "assets/screenshots/screen5.jpg",
    wireframe: "assets/wireframes/screen5.png",
    hotspots: [
      { top: "75%", left: "15%", width: "70%", height: "10%", target: "arview" },
      { top: "2%", left: "5%", width: "15%", height: "10%", target: "menu" }
    ]
  },
  games: {
    screenshot: "assets/screenshots/screen9.jpg",
    wireframe: "assets/wireframes/screen9.png",
    hotspots: [
      { top: "35%", left: "10%", width: "80%", height: "10%", target: "factmatch" },
      { top: "48%", left: "10%", width: "80%", height: "10%", target: "planetorder" },
      { top: "62%", left: "10%", width: "80%", height: "10%", target: "quiz" },
      { top: "2%", left: "5%", width: "15%", height: "10%", target: "menu" }
    ]
  },
  factmatch: {
    screenshot: "assets/screenshots/screen8.jpg",
    wireframe: "assets/wireframes/screen8.png",
    hotspots: [
      { top: "2%", left: "5%", width: "15%", height: "10%", target: "games" }
    ]
  },
  planetorder: {
    screenshot: "assets/screenshots/screen4.jpg",
    wireframe: "assets/wireframes/screen4.png",
    hotspots: [
      { top: "2%", left: "5%", width: "15%", height: "10%", target: "games" }
    ]
  },
  quiz: {
    screenshot: "assets/screenshots/screen7.jpg",
    wireframe: "assets/wireframes/screen7.png",
    hotspots: [
      { top: "2%", left: "5%", width: "15%", height: "10%", target: "games" }
    ]
  },
  arview: {
    screenshot: "assets/screenshots/screen10.jpg",
    wireframe: "assets/wireframes/screen10.png",
    hotspots: [
      { top: "2%", left: "5%", width: "15%", height: "10%", target: "menu" }
    ]
  }
};

let currentScreenId = "splash";

function loadSimulatorScreen(screenId) {
  if (!appFlow[screenId]) return;
  currentScreenId = screenId;
  const screenData = appFlow[screenId];
  const isWireframe = mediaToggle ? mediaToggle.checked : false;
  
  if (simulatorImg) {
    simulatorImg.style.opacity = "0";
    
    setTimeout(() => {
      simulatorImg.src = isWireframe ? screenData.wireframe : screenData.screenshot;
      simulatorImg.style.opacity = "1";
      
      if (hotspotsContainer) {
        hotspotsContainer.innerHTML = "";
        screenData.hotspots.forEach(hotspot => {
          const el = document.createElement("div");
          el.className = "hotspot hint";
          el.style.top = hotspot.top;
          el.style.left = hotspot.left;
          el.style.width = hotspot.width;
          el.style.height = hotspot.height;
          
          el.addEventListener("click", () => loadSimulatorScreen(hotspot.target));
          hotspotsContainer.appendChild(el);
          
          setTimeout(() => {
            if (el.parentNode) el.classList.remove("hint");
          }, 2000);
        });
      }
    }, 300);
  }
}

if (simulatorHome) {
  simulatorHome.addEventListener("click", () => loadSimulatorScreen("splash"));
}

// Initial load
if (simulatorImg) {
  loadSimulatorScreen("splash");
}

// Hook into existing toggle
if (mediaToggle) {
  mediaToggle.addEventListener('change', () => {
    loadSimulatorScreen(currentScreenId);
  });
}

// Research Findings Dashboard Animations
document.addEventListener('DOMContentLoaded', function() {
  initDashboardAnimations();
});

// Dashboard Animation Functions
function initDashboardAnimations() {
  // Animate statistics numbers on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatNumbers(entry.target);
        animateBarCharts(entry.target);
      }
    });
  }, observerOptions);

  // Observe all stat cards and charts
  document.querySelectorAll('.stat-card, .chart-card').forEach(card => {
    statsObserver.observe(card);
  });
}

// Animate stat numbers counting up
function animateStatNumbers(card) {
  const statNumber = card.querySelector('.stat-number');
  if (statNumber && !statNumber.classList.contains('animated')) {
    statNumber.classList.add('animated');
    const targetValue = parseInt(statNumber.getAttribute('data-target'));
    animateCounter(statNumber, 0, targetValue, 2000);
  }
}

// Animate bar charts growing from bottom
function animateBarCharts(card) {
  const simpleBars = card.querySelectorAll('.simple-bar');
  const regularBars = card.querySelectorAll('.bar');
  const verticalBars = card.querySelectorAll('.vertical-bar');
  
  // Handle simple bars
  simpleBars.forEach(bar => {
    if (!bar.classList.contains('animated')) {
      bar.classList.add('animated');
      const targetValue = parseInt(bar.getAttribute('data-value'));
      animateSimpleBar(bar, targetValue, 1500);
    }
  });
  
  // Handle regular bars
  regularBars.forEach(bar => {
    if (!bar.classList.contains('animated')) {
      bar.classList.add('animated');
      const targetValue = parseInt(bar.getAttribute('data-value'));
      animateBar(bar, 0, targetValue, 1500);
    }
  });
  
  // Handle vertical bars
  verticalBars.forEach(bar => {
    if (!bar.classList.contains('animated')) {
      bar.classList.add('animated');
      const targetValue = parseInt(bar.getAttribute('data-value'));
      animateVerticalBar(bar, targetValue, 1500);
    }
  });
}

// Vertical bar animation utility
function animateVerticalBar(element, end, duration) {
  // Add animated class to trigger CSS transition
  setTimeout(() => {
    element.style.height = end + '%';
  }, 100);
}

// Counter animation utility
function animateCounter(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      element.textContent = end + '%';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '%';
    }
  }, 16);
}

// Bar animation utility
function animateBar(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      element.style.width = end + '%';
      // Show value after animation
      const valueDisplay = element.querySelector('.bar-value');
      if (valueDisplay) {
        valueDisplay.style.opacity = '1';
      }
      clearInterval(timer);
    } else {
      element.style.width = current + '%';
    }
  }, 16);
}

// Simple bar animation utility
function animateSimpleBar(element, end, duration) {
  // Add animated class to trigger CSS transition
  setTimeout(() => {
    element.style.width = end + '%';
  }, 100);
}

// Interactive Learning Effectiveness Metrics
document.addEventListener('DOMContentLoaded', function() {
  initInteractiveMetrics();
});

function initInteractiveMetrics() {
  const metricsData = {
    concept: {
      traditional: 52,
      ar: 88,
      insight: "AR learning significantly improved concept understanding compared to traditional teaching methods."
    },
    retention: {
      traditional: 58,
      ar: 84,
      insight: "Knowledge retention increased substantially with AR-based learning approach."
    },
    motivation: {
      traditional: 49,
      ar: 92,
      insight: "Student motivation showed remarkable improvement with interactive AR content."
    },
    participation: {
      traditional: 55,
      ar: 90,
      insight: "Interactive participation rates nearly doubled with AR learning platform."
    }
  };

  let currentMetric = 'concept';

  // Fact card click handlers
  const factCards = document.querySelectorAll('.fact-card');
  factCards.forEach(card => {
    card.addEventListener('click', function() {
      const metric = this.getAttribute('data-metric');
      updatePieChart(metric, metricsData[metric]);
      
      // Update active state
      factCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Initialize with concept data
  updatePieChart(currentMetric, metricsData[currentMetric]);
}

function updatePieChart(metric, data) {
  const traditional = data.traditional;
  const ar = data.ar;
  const total = traditional + ar;
  
  // Calculate angles for pie segments
  const traditionalAngle = (traditional / total) * 360;
  const arAngle = (ar / total) * 360;
  
  // Create pie chart paths
  const traditionalPath = createPieSegment(100, 100, 80, 0, traditionalAngle);
  const arPath = createPieSegment(100, 100, 80, traditionalAngle, traditionalAngle + arAngle);
  
  // Update SVG paths
  const traditionalSegment = document.querySelector('.pie-segment.traditional');
  const arSegment = document.querySelector('.pie-segment.ar-learning');
  
  if (traditionalSegment) {
    traditionalSegment.setAttribute('d', traditionalPath);
    traditionalSegment.style.opacity = '0';
    setTimeout(() => {
      traditionalSegment.style.opacity = '1';
    }, 100);
  }
  
  if (arSegment) {
    arSegment.setAttribute('d', arPath);
    arSegment.style.opacity = '0';
    setTimeout(() => {
      arSegment.style.opacity = '1';
    }, 200);
  }
  
  // Update labels
  const traditionalLabel = document.querySelector('.traditional-label');
  const arLabel = document.querySelector('.ar-label');
  
  if (traditionalLabel) traditionalLabel.textContent = traditional + '%';
  if (arLabel) arLabel.textContent = ar + '%';
  
  // Update insight
  const insight = document.querySelector('.chart-insight p');
  if (insight) insight.textContent = data.insight;
}

function createPieSegment(cx, cy, radius, startAngle, endAngle) {
  const startAngleRad = (startAngle - 90) * Math.PI / 180;
  const endAngleRad = (endAngle - 90) * Math.PI / 180;
  
  const x1 = cx + radius * Math.cos(startAngleRad);
  const y1 = cy + radius * Math.sin(startAngleRad);
  const x2 = cx + radius * Math.cos(endAngleRad);
  const y2 = cy + radius * Math.sin(endAngleRad);
  
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  
  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

// Learning Effectiveness Metrics Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
  initLearningMetrics();
});

function initLearningMetrics() {
  const metricsData = {
    concept: {
      traditional: 52,
      ar: 88,
      insight: "AR learning significantly improved concept understanding compared to traditional teaching methods."
    },
    retention: {
      traditional: 58,
      ar: 84,
      insight: "Knowledge retention increased substantially with AR-based learning approach."
    },
    motivation: {
      traditional: 49,
      ar: 92,
      insight: "Student motivation showed remarkable improvement with interactive AR content."
    },
    participation: {
      traditional: 55,
      ar: 90,
      insight: "Interactive participation rates nearly doubled with AR learning platform."
    }
  };

  let currentMetric = 'concept';

  // Metric card click handlers
  const metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach(card => {
    card.addEventListener('click', function() {
      const metric = this.getAttribute('data-metric');
      updatePieChart(metric, metricsData[metric]);
      
      // Update active state
      metricCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Initialize with concept data
  updatePieChart(currentMetric, metricsData[currentMetric]);
}

function updatePieChart(metric, data) {
  const traditional = data.traditional;
  const ar = data.ar;
  const total = traditional + ar;
  
  // Calculate angles for pie segments
  const traditionalAngle = (traditional / total) * 360;
  const arAngle = (ar / total) * 360;
  
  // Create pie chart paths
  const traditionalPath = createPieSegment(100, 100, 80, 0, traditionalAngle);
  const arPath = createPieSegment(100, 100, 80, traditionalAngle, traditionalAngle + arAngle);
  
  // Update SVG paths
  const traditionalSegment = document.querySelector('.pie-segment.traditional');
  const arSegment = document.querySelector('.pie-segment.ar-learning');
  
  if (traditionalSegment) {
    traditionalSegment.setAttribute('d', traditionalPath);
    traditionalSegment.style.opacity = '0';
    setTimeout(() => {
      traditionalSegment.style.opacity = '1';
    }, 100);
  }
  
  if (arSegment) {
    arSegment.setAttribute('d', arPath);
    arSegment.style.opacity = '0';
    setTimeout(() => {
      arSegment.style.opacity = '1';
    }, 200);
  }
  
  // Update labels
  const traditionalLabel = document.querySelector('.traditional-label');
  const arLabel = document.querySelector('.ar-label');
  
  if (traditionalLabel) traditionalLabel.textContent = traditional + '%';
  if (arLabel) arLabel.textContent = ar + '%';
  
  // Update insight
  const insight = document.querySelector('.chart-insight p');
  if (insight) insight.textContent = data.insight;
}
