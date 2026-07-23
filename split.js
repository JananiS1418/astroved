const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'src', 'app', 'pages', 'live-astrology-consultation');
const htmlFile = path.join(basePath, 'live-astrology-consultation.html');
const cssFile = path.join(basePath, 'live-astrology-consultation.css');
const componentsDir = path.join(basePath, 'components');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir);
}

const htmlContent = fs.readFileSync(htmlFile, 'utf8');
const cssContent = fs.readFileSync(cssFile, 'utf8');

// Define components and their boundary markers in HTML and CSS
const components = [
  {
    name: 'navbar',
    htmlStart: '<!-- Premium AstroVed Full-Width Responsive Navbar -->',
    htmlEnd: '<!-- ============================================================',
    cssStart: '/* ----- FULL-WIDTH HEADER ----- */',
    cssEnd: '/* ============================================================\n     PREMIUM BANNER SECTION'
  },
  {
    name: 'banner',
    htmlStart: 'PREMIUM BANNER SECTION (Floating Rounded Banner with Video BG)',
    htmlEnd: '1. TRUST & CREDIBILITY SECTION',
    cssStart: 'PREMIUM BANNER SECTION (Floating Rounded Banner with Video BG)',
    cssEnd: 'GLOBAL & REUSABLE STYLES FOR NEW SECTIONS'
  },
  {
    name: 'trust-banner',
    htmlStart: '1. TRUST & CREDIBILITY SECTION',
    htmlEnd: '2. WHY CHOOSE ASTROVED SECTION',
    cssStart: '1. TRUST BANNER SECTION',
    cssEnd: '2. WHY CHOOSE ASTROVED SECTION'
  },
  {
    name: 'why-choose',
    htmlStart: '2. WHY CHOOSE ASTROVED SECTION',
    htmlEnd: '3. WHAT CAN WE HELP YOU WITH? SECTION',
    cssStart: '2. WHY CHOOSE ASTROVED SECTION',
    cssEnd: '3. WHAT CAN WE HELP YOU WITH? SECTION'
  },
  {
    name: 'categories',
    htmlStart: '3. WHAT CAN WE HELP YOU WITH? SECTION',
    htmlEnd: '4. QUESTIONS YOU CAN ASK SECTION',
    cssStart: '3. WHAT CAN WE HELP YOU WITH? SECTION',
    cssEnd: '4. QUESTIONS YOU CAN ASK SECTION'
  },
  {
    name: 'questions',
    htmlStart: '4. QUESTIONS YOU CAN ASK SECTION',
    htmlEnd: '5. HOW CONSULTATION WORKS SECTION',
    cssStart: '4. QUESTIONS YOU CAN ASK SECTION',
    cssEnd: '5. HOW CONSULTATION WORKS SECTION'
  },
  {
    name: 'how-it-works',
    htmlStart: '5. HOW CONSULTATION WORKS SECTION',
    htmlEnd: '6. TIME ZONE & BOOKING INFO SECTION',
    cssStart: '5. HOW CONSULTATION WORKS SECTION',
    cssEnd: '6. TIME ZONE & BOOKING INFO SECTION'
  },
  {
    name: 'booking-info',
    htmlStart: '6. TIME ZONE & BOOKING INFO SECTION',
    htmlEnd: '7. MEET OUR EXPERT ASTROLOGERS SECTION',
    cssStart: '6. TIME ZONE & BOOKING INFO SECTION',
    cssEnd: '7. MEET OUR EXPERT ASTROLOGERS SECTION'
  },
  {
    name: 'astrologers',
    htmlStart: '7. MEET OUR EXPERT ASTROLOGERS SECTION',
    htmlEnd: '8. CLIENT TESTIMONIAL VIDEOS SECTION',
    cssStart: '7. MEET OUR EXPERT ASTROLOGERS SECTION',
    cssEnd: '8. CLIENT TESTIMONIAL VIDEOS SECTION'
  },
  {
    name: 'testimonials',
    htmlStart: '8. CLIENT TESTIMONIAL VIDEOS SECTION',
    htmlEnd: '9. FREQUENTLY ASKED QUESTIONS SECTION',
    cssStart: '8. CLIENT TESTIMONIAL VIDEOS SECTION',
    cssEnd: '9. FREQUENTLY ASKED QUESTIONS SECTION'
  },
  {
    name: 'faq',
    htmlStart: '9. FREQUENTLY ASKED QUESTIONS SECTION',
    htmlEnd: '10. PREMIUM FOOTER',
    cssStart: '9. FREQUENTLY ASKED QUESTIONS SECTION',
    cssEnd: '10. PREMIUM FOOTER'
  },
  {
    name: 'footer',
    htmlStart: '10. PREMIUM FOOTER',
    htmlEnd: 'EOF', // Special case
    cssStart: '10. PREMIUM FOOTER',
    cssEnd: 'EOF' // Special case
  }
];

// Split the HTML
let currentHtml = htmlContent;
let currentCss = cssContent;

components.forEach((comp, index) => {
  const compDir = path.join(componentsDir, comp.name);
  if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir);
  }

  // Extract HTML
  let htmlPart = '';
  if (index === components.length - 1) {
    const startIndex = currentHtml.indexOf('<!-- ============================================================\r\n     ' + comp.htmlStart);
    if(startIndex === -1) {
       htmlPart = currentHtml; 
    } else {
       htmlPart = currentHtml.substring(startIndex);
    }
  } else {
    const nextComp = components[index + 1];
    let startMarker = comp.htmlStart;
    if (index === 0) startMarker = comp.htmlStart;
    else startMarker = '<!-- ============================================================\r\n     ' + comp.htmlStart;
    
    let endMarker = '<!-- ============================================================\r\n     ' + nextComp.htmlStart;
    if(index === 0) {
      endMarker = '<!-- ============================================================';
    }

    const startIndex = index === 0 ? currentHtml.indexOf(startMarker) : currentHtml.indexOf(startMarker);
    let endIndex = currentHtml.indexOf(endMarker);
    if (endIndex === -1 && index === 0) {
      endIndex = currentHtml.indexOf('<!-- ============================================================\n     ');
    }

    if (startIndex !== -1 && endIndex !== -1) {
      htmlPart = currentHtml.substring(startIndex, endIndex);
    } else {
      console.log(`Could not find HTML boundaries for ${comp.name}`);
    }
  }
  
  // Create TS file
  const className = comp.name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') + 'Component';
  let tsContent = `import { Component } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-${comp.name}',\n  standalone: true,\n  imports: [CommonModule],\n  templateUrl: './${comp.name}.component.html',\n  styleUrl: './${comp.name}.component.css'\n})\nexport class ${className} {}\n`;
  
  if (comp.name === 'navbar') {
    tsContent = `import { Component, HostListener, signal } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-navbar',\n  standalone: true,\n  imports: [CommonModule],\n  templateUrl: './navbar.component.html',\n  styleUrl: './navbar.component.css'\n})\nexport class NavbarComponent {\n  isScrolled = signal(false);\n  isMobileMenuOpen = signal(false);\n  isSearchOpen = signal(false);\n  activeMenu = signal('Consultation');\n\n  @HostListener('window:scroll', [])\n  onWindowScroll() {\n    this.isScrolled.set(window.scrollY > 20);\n  }\n\n  toggleMobileMenu() {\n    this.isMobileMenuOpen.update(v => !v);\n  }\n\n  toggleSearch() {\n    this.isSearchOpen.update(v => !v);\n  }\n\n  setActiveMenu(menu: string) {\n    this.activeMenu.set(menu);\n  }\n}\n`;
  }

  fs.writeFileSync(path.join(compDir, `${comp.name}.component.html`), htmlPart.trim() + '\n');
  fs.writeFileSync(path.join(compDir, `${comp.name}.component.ts`), tsContent);
  
  // Extract CSS
  let cssPart = '';
  if (index === components.length - 1) {
    const startIndex = currentCss.indexOf('/* ============================================================\r\n     ' + comp.cssStart);
    if(startIndex !== -1) cssPart = currentCss.substring(startIndex);
  } else {
    let startMarker = comp.cssStart;
    if (index !== 0) startMarker = '/* ============================================================\r\n     ' + comp.cssStart;
    
    let endMarker = '/* ============================================================\r\n   ' + components[index + 1].cssStart;
    if(index === 0) endMarker = '/* ============================================================\r\n     PREMIUM BANNER SECTION';
    if(index === 1) endMarker = '/* ============================================================\r\n   GLOBAL & REUSABLE STYLES';

    let startIndex = index === 0 ? currentCss.indexOf(startMarker) : currentCss.indexOf(startMarker);
    let endIndex = currentCss.indexOf(endMarker);
    
    // try fallback for windows/linux line endings
    if (endIndex === -1) {
        endMarker = endMarker.replace('\r\n', '\n');
        endIndex = currentCss.indexOf(endMarker);
    }
    
    if (startIndex !== -1 && endIndex !== -1) {
      cssPart = currentCss.substring(startIndex, endIndex);
    } else {
      console.log(`Could not find CSS boundaries for ${comp.name}. Start: ${startIndex}, End: ${endIndex}`);
    }
  }

  fs.writeFileSync(path.join(compDir, `${comp.name}.component.css`), cssPart.trim() + '\n');
});

// Create new main HTML
const newMainHtml = components.map(c => `<app-${c.name}></app-${c.name}>`).join('\n');
fs.writeFileSync(htmlFile, newMainHtml + '\n');

// Update main TS
let mainTs = fs.readFileSync(path.join(basePath, 'live-astrology-consultation.ts'), 'utf8');
const imports = components.map(c => {
    const className = c.name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') + 'Component';
    return `import { ${className} } from './components/${c.name}/${c.name}.component';`;
}).join('\n');

mainTs = mainTs.replace("import { CommonModule } from '@angular/common';", `import { CommonModule } from '@angular/common';\n${imports}`);

const classesList = components.map(c => c.name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') + 'Component').join(', ');
mainTs = mainTs.replace('imports: [CommonModule]', `imports: [CommonModule, ${classesList}]`);

// Remove old signals and methods
mainTs = mainTs.replace(/  isScrolled = signal\(false\);[\s\S]*?}\n/m, '');

fs.writeFileSync(path.join(basePath, 'live-astrology-consultation.ts'), mainTs);

// Leave global CSS in main css file
const globalCssStart = cssContent.indexOf('/* ============================================================\r\n   GLOBAL & REUSABLE STYLES FOR NEW SECTIONS');
let globalCssEnd = cssContent.indexOf('/* ============================================================\r\n     1. TRUST BANNER SECTION');
if(globalCssEnd === -1) globalCssEnd = cssContent.indexOf('/* ============================================================\n     1. TRUST BANNER SECTION');

if (globalCssStart !== -1 && globalCssEnd !== -1) {
    const globalCss = cssContent.substring(0, cssContent.indexOf('/* ----- FULL-WIDTH HEADER ----- */')) + cssContent.substring(globalCssStart, globalCssEnd);
    fs.writeFileSync(cssFile, globalCss);
}

console.log('Successfully split components!');
