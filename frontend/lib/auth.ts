export type Role = "class_teacher" | "school_admin" | "student" | "deo_officer";

export interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  class: string;
  role: Role;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string | number;
}

export const ROLE_OPTIONS: { role: Role; label: string }[] = [
  { role: "class_teacher", label: "Class Teacher" },
  { role: "school_admin", label: "School Principal" },
  { role: "student", label: "Student" },
  { role: "deo_officer", label: "District Education Officer" },
];

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  class_teacher: [
    { href: "/dashboard", label: "Dashboard", icon: "Home" },
    { href: "/submissions", label: "Submissions", icon: "FileText" },
    { href: "/review", label: "Grade Review", icon: "CheckCircle" },
    { href: "/analytics", label: "Analytics", icon: "BarChart3" },
    { href: "/alerts", label: "Alerts", icon: "AlertTriangle" },
  ],
  school_admin: [
    { href: "/dashboard", label: "School Overview", icon: "Home" },
    { href: "/submissions", label: "All Classes", icon: "FileText" },
    { href: "/analytics", label: "Analytics", icon: "BarChart3" },
    { href: "/alerts", label: "Alerts", icon: "AlertTriangle" },
  ],
  student: [
    { href: "/dashboard", label: "My Assignments", icon: "Home" },
    { href: "/submissions", label: "My Feedback", icon: "FileText" },
    { href: "/alerts", label: "Recovery Plan", icon: "Target" },
  ],
  deo_officer: [
    { href: "/dashboard", label: "District Overview", icon: "Home" },
    { href: "/submissions", label: "Ghost Schools", icon: "Building2" },
    { href: "/analytics", label: "Analytics", icon: "BarChart3" },
    { href: "/alerts", label: "Escalations", icon: "AlertTriangle" },
  ],
};

export const USER_BY_ROLE: Record<Role, User> = {
  class_teacher: {
    id: "bbbbbbbb-0001-0001-0001-000000000001",
    name: "Ms. Ayesha Raza",
    email: "ayesha.raza@lahoremodel.edu.pk",
    school: "Lahore Model High School",
    class: "Class 8-A",
    role: "class_teacher",
  },
  school_admin: {
    id: "aaaaaaaa-0001-0001-0001-000000000001",
    name: "Principal Muhammad Tariq",
    email: "principal@lahoremodel.edu.pk",
    school: "Lahore Model High School",
    class: "Administration",
    role: "school_admin",
  },
  student: {
    id: "cccccccc-0001-0001-0001-000000000001",
    name: "Ahmed Ali",
    email: "ahmed.ali@student.lahoremodel.edu.pk",
    school: "Lahore Model High School",
    class: "Class 8-A",
    role: "student",
  },
  deo_officer: {
    id: "eeeeeeee-0001-0001-0001-000000000001",
    name: "DEO Dr. Salman Khan",
    email: "deo.karachi@mofept.gov.pk",
    school: "District Education Office",
    class: "District Supervisory",
    role: "deo_officer",
  },
};

export const DEMO_USER: User = USER_BY_ROLE.class_teacher;

export function getInitials(name: string): string {
  if (!name) return "";
  const cleaned = name.replace(/^(Ms\.|Mr\.|Mrs\.|Dr\.|Prof\.)\s+/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
