// src/utils/detectProgrammingLanguage.ts
export async function detectProgrammingLanguage(html: string, url: string): Promise<string | null> {
    if (html.includes('PHP')) {
      return 'PHP';
    }
  
    if (html.includes('Laravel')) {
      return 'Laravel (PHP Framework)';
    }
  
    if (html.includes('Django')) {
      return 'Django (Python Framework)';
    }
  
    if (html.includes('Flask')) {
      return 'Flask (Python Framework)';
    }
  
    if (html.includes('Express')) {
      return 'Express.js (Node.js Framework)';
    }
  
    if (html.includes('Node.js') || html.includes('node_modules')) {
      return 'Node.js';
    }
  
    // Add more checks for other languages or frameworks here
    
    return null;
  }
  