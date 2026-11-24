export interface Employee {
  first: string;
  last: string;
  initials: string;
  id: string;
  dept: string;
  title: string;
  loc: string;
  type: "Full-time" | "Part-time" | "Contract";
  status: "Active" | "On leave" | "Probation";
  hire: string;
}

export const employees: Employee[] = [
  { first: "Ava", last: "Mitchell", initials: "AM", id: "E-1042", dept: "People & Culture", title: "People Operations Lead", loc: "Melbourne", type: "Full-time", status: "Active", hire: "12 Feb 2021" },
  { first: "Noah", last: "Williams", initials: "NW", id: "E-1043", dept: "Engineering", title: "Senior Software Engineer", loc: "Sydney", type: "Full-time", status: "Active", hire: "03 May 2022" },
  { first: "Isabella", last: "Chen", initials: "IC", id: "E-1044", dept: "Finance", title: "Payroll Specialist", loc: "Melbourne", type: "Full-time", status: "Active", hire: "18 Aug 2020" },
  { first: "Oliver", last: "Patel", initials: "OP", id: "E-1045", dept: "Sales", title: "Account Executive", loc: "Brisbane", type: "Full-time", status: "Active", hire: "22 Jan 2023" },
  { first: "Mia", last: "Thompson", initials: "MT", id: "E-1046", dept: "Marketing", title: "Brand Manager", loc: "Sydney", type: "Full-time", status: "On leave", hire: "07 Jun 2021" },
  { first: "Lucas", last: "Martin", initials: "LM", id: "E-1047", dept: "Operations", title: "Workforce Coordinator", loc: "Perth", type: "Part-time", status: "Active", hire: "14 Nov 2022" },
  { first: "Amelia", last: "Roberts", initials: "AR", id: "E-1048", dept: "Engineering", title: "Product Designer", loc: "Melbourne", type: "Full-time", status: "Active", hire: "01 Mar 2024" },
  { first: "Ethan", last: "Nguyen", initials: "EN", id: "E-1049", dept: "People & Culture", title: "Talent Partner", loc: "Sydney", type: "Full-time", status: "Active", hire: "19 Sep 2019" },
  { first: "Charlotte", last: "Brown", initials: "CB", id: "E-1050", dept: "Finance", title: "Financial Analyst", loc: "Brisbane", type: "Full-time", status: "Active", hire: "11 Apr 2023" },
  { first: "Leo", last: "Wilson", initials: "LW", id: "E-1051", dept: "Sales", title: "Sales Development Rep", loc: "Melbourne", type: "Full-time", status: "Probation", hire: "06 Jan 2025" },
  { first: "Grace", last: "Taylor", initials: "GT", id: "E-1052", dept: "Customer Success", title: "Customer Success Lead", loc: "Adelaide", type: "Full-time", status: "Active", hire: "27 Jul 2020" },
  { first: "Jack", last: "Anderson", initials: "JA", id: "E-1053", dept: "Engineering", title: "QA Engineer", loc: "Sydney", type: "Contract", status: "Active", hire: "08 Oct 2024" },
  { first: "Ella", last: "Thomas", initials: "ET", id: "E-1054", dept: "Marketing", title: "Content Strategist", loc: "Melbourne", type: "Part-time", status: "Active", hire: "16 May 2022" },
  { first: "Henry", last: "Walker", initials: "HW", id: "E-1055", dept: "Operations", title: "Facilities Manager", loc: "Perth", type: "Full-time", status: "Active", hire: "24 Feb 2018" },
  { first: "Sophie", last: "White", initials: "SW", id: "E-1056", dept: "Customer Success", title: "Implementation Consultant", loc: "Brisbane", type: "Full-time", status: "On leave", hire: "09 Dec 2021" },
  { first: "William", last: "Harris", initials: "WH", id: "E-1057", dept: "Engineering", title: "Platform Engineer", loc: "Sydney", type: "Full-time", status: "Active", hire: "13 Mar 2023" },
  { first: "Zoe", last: "Clark", initials: "ZC", id: "E-1058", dept: "People & Culture", title: "HR Business Partner", loc: "Melbourne", type: "Full-time", status: "Active", hire: "30 Jun 2019" },
  { first: "James", last: "Lewis", initials: "JL", id: "E-1059", dept: "Finance", title: "Accounts Officer", loc: "Adelaide", type: "Part-time", status: "Active", hire: "02 Aug 2024" },
  { first: "Lily", last: "Hall", initials: "LH", id: "E-1060", dept: "Sales", title: "Account Executive", loc: "Sydney", type: "Full-time", status: "Active", hire: "20 Nov 2022" },
  { first: "Benjamin", last: "Young", initials: "BY", id: "E-1061", dept: "Operations", title: "Logistics Analyst", loc: "Brisbane", type: "Full-time", status: "Probation", hire: "04 Feb 2025" },
  { first: "Chloe", last: "King", initials: "CK", id: "E-1062", dept: "Marketing", title: "Digital Marketing Lead", loc: "Melbourne", type: "Full-time", status: "Active", hire: "17 Jan 2020" },
  { first: "Alexander", last: "Wright", initials: "AW", id: "E-1063", dept: "Engineering", title: "Engineering Manager", loc: "Sydney", type: "Full-time", status: "Active", hire: "25 Apr 2017" },
  { first: "Ruby", last: "Lopez", initials: "RL", id: "E-1064", dept: "Customer Success", title: "Support Specialist", loc: "Perth", type: "Part-time", status: "Active", hire: "03 Sep 2023" },
  { first: "Daniel", last: "Hill", initials: "DH", id: "E-1065", dept: "Finance", title: "Payroll Analyst", loc: "Melbourne", type: "Full-time", status: "Active", hire: "15 Dec 2021" },
  { first: "Evie", last: "Scott", initials: "ES", id: "E-1066", dept: "People & Culture", title: "Recruitment Coordinator", loc: "Brisbane", type: "Full-time", status: "Active", hire: "10 Oct 2024" },
];
