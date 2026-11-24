export const SETTING_DESCRIPTIONS: Record<string, string> = {
  "Organization name": "Shown across your company workspace.",
  "Address": "Registered address of your organization.",
  "Organization email": "Primary contact for organization notifications.",
  "Company website": "Your organization website.",
  "Default time zone": "Used for dates, times and scheduled work.",
  "Date format": "How dates are displayed across the platform.",
  "Base currency": "Currency used for payroll summaries.",
  "Payroll frequency": "Default pay cycle for your organization.",
  "Payroll approval": "Approval steps before a pay run is finalized.",
  "Annual leave allowance": "Standard annual leave entitlement, in days.",
  "Sick leave allowance": "Standard sick leave entitlement, in days.",
  "Leave year starts": "The date annual leave balances renew.",
  "Work week": "Standard working days for your organization.",
  "Standard hours per week": "Used to calculate work schedules and attendance.",
  "Email notifications": "Receive organization updates by email.",
  "Payroll reminders": "Get notified before payroll deadlines.",
  "Two-factor authentication": "Require a second verification step for sign in.",
  "Session timeout": "Automatically end inactive sessions.",
  "Default employee status": "Default status for newly created employee records.",
};

export const SETTING_SELECT_OPTIONS: Record<string, string[]> = {
  "Default time zone": ["Australia/Melbourne", "Australia/Sydney", "Australia/Brisbane", "UTC"],
  "Date format": ["DD MMM YYYY", "DD/MM/YYYY", "MM/DD/YYYY"],
  "Base currency": ["AUD", "NZD", "SGD", "GBP", "USD"],
  "Payroll frequency": ["Weekly", "Fortnightly", "Monthly"],
  "Payroll approval": ["One-step approval", "Two-step approval", "Three-step approval"],
  "Leave year starts": ["1 January", "1 July", "Organization anniversary"],
  "Work week": ["Monday – Friday", "Sunday – Thursday", "Saturday – Wednesday"],
  "Default employee status": ["Active", "Probation", "Pending"],
  "Session timeout": ["15 minutes", "30 minutes", "60 minutes", "Never"],
};

export const SETTING_TOGGLE_KEYS = new Set([
  "Email notifications",
  "Payroll reminders",
  "Two-factor authentication",
]);

export const SETTING_NUMBER_KEYS = new Set([
  "Annual leave allowance",
  "Sick leave allowance",
  "Standard hours per week",
  "Session timeout",
]);

export const INITIAL_PREFS: Record<string, string> = {
  "Organization name": "Northstar Group",
  "Address": "1 Collins Street, Melbourne VIC 3000",
  "Organization email": "people@northstar.example",
  "Default time zone": "Australia/Melbourne",
  "Date format": "DD MMM YYYY",
  "Base currency": "AUD",
  "Payroll frequency": "Fortnightly",
  "Payroll approval": "Two-step approval",
  "Annual leave allowance": "20",
  "Sick leave allowance": "10",
  "Leave year starts": "1 January",
  "Work week": "Monday – Friday",
  "Standard hours per week": "38",
  "Email notifications": "on",
  "Payroll reminders": "on",
  "Two-factor authentication": "on",
  "Session timeout": "30 minutes",
  "Default employee status": "Active",
  "Company website": "northstar.example",
};
