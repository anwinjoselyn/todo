export const todoTypes: any = [
  {
    id: 1,
    title: 'Task',
    description: '',
    key: 'task',
  },
  {
    id: 2,
    title: 'Story',
    description: '',
    key: 'story',
  },
  {
    id: 3,
    title: 'Bug',
    description: '',
    key: 'bug',
  },
  {
    id: 4,
    title: 'Note',
    description: '',
    key: 'note',
  },
  {
    id: 5,
    title: 'Feature',
    description: '',
    key: 'feature',
  },
  {
    id: 6,
    title: 'Design',
    description: '',
    key: 'design',
  },
  {
    id: 7,
    title: 'Logic',
    description: '',
    key: 'logic',
  },
  {
    id: 8,
    title: 'Inspiration',
    description: '',
    key: 'inspiration',
  },
  {
    id: 9,
    title: 'Idea',
    description: '',
    key: 'idea',
  },
  {
    id: 10,
    title: 'To Read',
    description: '',
    key: 'toRead',
  },
  {
    id: 11,
    title: 'To Try',
    description: '',
    key: 'toTry',
  },
  {
    id: 12,
    title: 'To Learn',
    description: '',
    key: 'toLearn',
  },
  {
    id: 13,
    title: 'How Tos',
    description: '',
    key: 'howTos',
  },
];

export const sidebarValues: any = [
  {
    key: 6,
    title: 'Overview',
    description: 'All To Dos',
    route: '/',
    icon: 'preview',
    children: [],
  },
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

export const todoFormData: { [key: string]: any } = {
  title: {
    key: 'title',
    label: 'Title',
    value: '',
    type: 'text',
    required: true,
    placeholder: 'Enter a title',
  },
  type: {
    key: 'type',
    label: 'Type',
    value: '',
    type: 'select',
    required: true,
    placeholder: 'Select a Type',
    options: todoTypes.map((typ: any) => {
      return { key: typ.key, value: typ.title };
    }),
  },
  assignedTo: {
    key: 'assignedTo',
    label: 'Assigned To',
    value: '',
    type: 'select',
    required: true,
    placeholder: 'Select a User',
  },
  body: {
    key: 'body',
    label: 'Content',
    value: '',
    type: 'textarea',
    rows: 10,
    required: true,
    placeholder: 'Enter the content',
  },
  dueDate: {
    key: 'dueDate',
    label: 'Due Date',
    value: '',
    type: 'date',
    required: true,
    placeholder: new Date(),
  },
  isCompleted: {
    key: 'isCompleted',
    label: 'Mark Complete?',
    value: null,
    type: 'radio',
    required: false,
    options: [
      { title: 'YES', value: true },
      { title: 'NO', value: false },
    ],
  },
};
