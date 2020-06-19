export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--text-primary': '#1e88e5',
    '--bg-primary': '#1e88e5',
    '--text-secondary': '#607d8b',
    '--bg-secondary': '#607d8b',
    '--text-success': '#4caf50',
    '--bg-success': '#4caf50',
    '--text-warning': '#ff9800',
    '--bg-warning': '#ff9800',
    '--text-info': '#039be5',
    '--bg-info': '#039be5',
    '--text-danger': '#f44336',
    '--bg-danger': '#f44336',
    '--navbar-bg-color': '#ffffff',
    '--navbar-text-color': 'rgba(0,0,0,.87)',
    '--sidebar-bg-color':  '#3c4252',
    '--sidebar-text-color': '#ffffff',
    '--bg-content': '#f5f5f5',
    '--text-content': 'rgba(0,0,0,.54)'

  }
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--text-primary': '#1e2146',
    '--bg-primary': '#1e2146',
    '--text-secondary': '#607d8b',
    '--bg-secondary': '#607d8b',
    '--text-success': '#4caf50',
    '--bg-success': '#4caf50',
    '--text-warning': '#ff9800',
    '--bg-warning': '#ff9800',
    '--text-info': '#039be5',
    '--bg-info': '#039be5',
    '--text-danger': '#f44336',
    '--bg-danger': '#f44336',
    '--navbar-bg-color': '#212121',
    '--navbar-text-color': '#ffffff',
    '--sidebar-bg-color': '#303030',
    '--sidebar-text-color': '#ffffff',
    '--bg-content': '#f5f5f5',
    '--text-content': '#f5f5f5'
  }
};
