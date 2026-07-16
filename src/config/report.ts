import Handlebars from 'handlebars';

// Register custom Handlebars helpers
Handlebars.registerHelper('formatDate', (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

Handlebars.registerHelper('formatCurrency', (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
});

Handlebars.registerHelper('uppercase', (str: string) => {
  return str?.toUpperCase() || '';
});

Handlebars.registerHelper('ifEqual', function(a, b, options: any) {
  return a === b ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifNotEqual', function(a, b, options: any) {
  return a !== b ? options.fn(this) : options.inverse(this);
});

export const reportConfig = {
  renderTemplate(template: string, data: any): string {
    const compiled = Handlebars.compile(template);
    return compiled(data);
  },

  compileTemplate(template: string): HandlebarsTemplateDelegate {
    return Handlebars.compile(template);
  },
};
