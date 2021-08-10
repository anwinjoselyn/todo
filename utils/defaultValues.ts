export const todoTypes: any = [
  {
    id: 1,
    title: 'Task',
    description: '',
  },
  {
    id: 2,
    title: 'Story',
    description: '',
  },
  {
    id: 3,
    title: 'Bug',
    description: '',
  },
  {
    id: 4,
    title: 'Note',
    description: '',
  },
  {
    id: 5,
    title: 'Feature',
    description: '',
  },
  {
    id: 6,
    title: 'Design',
    description: '',
  },
  {
    id: 7,
    title: 'Logic',
    description: '',
  },
  {
    id: 8,
    title: 'Inspiration',
    description: '',
  },
  {
    id: 9,
    title: 'Idea',
    description: '',
  },
  {
    id: 10,
    title: 'To Read',
    description: '',
  },
  {
    id: 11,
    title: 'To Try',
    description: '',
  },
  {
    id: 11,
    title: 'To Learn',
    description: '',
  },
];

export const sidebarValues: any = [
  {
    key: 1,
    title: 'Inbox',
    description: 'All Items by Date(s)',
    route: '/inbox',
    icon: 'mail',
    children: [],
  },
  {
    key: 2,
    title: 'Tasks',
    description: 'All Tasks and To Dos',
    route: '/tasks',
    icon: 'task',
    children: [],
  },
  {
    key: 3,
    title: 'Notes',
    description: 'Random notes',
    route: '/notes',
    icon: 'sticky_note_2',
    children: [],
  },
  {
    key: 4,
    title: 'Ideas',
    description: 'Ideas and Inspirations',
    route: '/dreams',
    icon: 'lightbulb',
    children: [
      {
        key: 1,
        title: 'Ideas',
        description: 'Ideas',
        route: '/dreams/ideas',
        icon: 'emoji_objects',
        children: [],
      },
      {
        key: 2,
        title: 'Inspirations',
        description: 'Inspirations',
        route: '/dreams/inspirations',
        icon: 'online_prediction',
        children: [],
      },
    ],
  },
  {
    key: 5,
    title: 'Misc',
    description: 'All Other Task Types',
    route: '/others',
    icon: 'apps',
    children: [
        {
            key: 1,
            title: 'To Read',
            description: 'Miscellaneous',
            route: '/others/to-read',
            icon: 'auto_stories',
            children: [],
          },
          {
            key: 2,
            title: 'To Try',
            description: 'Inspirations',
            route: '/others/to-try',
            icon: 'code',
            children: [],
          },
          {
            key: 3,
            title: 'To Learn',
            description: 'Inspirations',
            route: '/others/to-learn',
            icon: 'library_books',
            children: [],
          },
    ],
  },
];
