import { Meta, StoryObj } from "@storybook/nextjs";

import { AppRoutes, RelationTo } from "@/lib/types";

import { GlobalHeader, IGlobalHeaderProps } from "./global-header";

type StoryProps = IGlobalHeaderProps;

const meta: Meta<StoryProps> = {
  title: "Layout/Global Header",
  component: GlobalHeader,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    navbarItems: [
      {
        id: "1",
        relationTo: RelationTo.PAGES,
        label: "Home",
        route: AppRoutes.HOME as string,
      },
      {
        id: "2",
        relationTo: RelationTo.CATEGORIES,
        label: "Educational Process",
      },
      {
        id: "3",
        relationTo: RelationTo.CATEGORIES,
        label: "Transparency",
      },
      {
        id: "4",
        relationTo: RelationTo.CATEGORIES,
        label: "About Us",
      },
    ],
    logo: {
      imgSrc: "/app-logo.svg",
      href: "/",
      altText: "App Logo",
      width: 87,
      height: 67,
    },
    ctaButtonLabel: "Contact Us",
    navmenu: {
      "2": [
        {
          id: "21",
          label: "Schedule",
          description: "Class timetables",
          icon: "Calendar",
        },
        {
          id: "22",
          label: "Curriculum",
          description: "Academic programs and courses",
          icon: "BookOpen",
        },
        {
          id: "23",
          label: "Extracurricular Activities",
          description: "Sports, clubs and activities",
          icon: "Users",
        },
      ],
      "3": [
        {
          id: "31",
          label: "Financial Reports",
          description: "Budget and financial statements",
          icon: "FileBarChart",
        },
        {
          id: "32",
          label: "Board Meetings",
          description: "Meeting minutes and agendas",
          icon: "Users2",
        },
        {
          id: "33",
          label: "Policies",
          description: "School rules and regulations",
          icon: "FileText",
        },
        {
          id: "34",
          label: "Annual Reports",
          description: "Yearly performance and achievements",
          icon: "Calendar",
        },
        {
          id: "35",
          label: "Public Records",
          description: "Open access documents",
          icon: "FolderOpen",
        },
        {
          id: "36",
          label: "Audit Results",
          description: "Independent assessment findings",
          icon: "Search",
        },
      ],
      "4": [
        {
          id: "41",
          label: "Our History",
          description: "School heritage and milestones",
          icon: "Clock",
        },
        {
          id: "42",
          label: "Mission & Vision",
          description: "Our goals and values",
          icon: "Target",
        },
        {
          id: "43",
          label: "Staff Directory",
          description: "Faculty and administration",
          icon: "UserCheck",
        },
      ],
    },
  },
};

export const Default: Story = {
  ...Template,
};
