export type MockFilesFolders = {
  path: string
  name: string
  folders: MockFilesFolders[]
  files: {
    path: string
    name: string
  }[]
}

export const filesFoldersList: MockFilesFolders[] = [
  {
    path: "/folder-1",
    name: "folder-1",
    folders: [
      {
        path: "/folder-1/aaa",
        name: "aaa",
        folders: [
          {
            path: "/folder-1/aaa/aaa-111111111",
            name: "aaa-111111111",
            folders: [],
            files: []
          },
          {
            path: "/folder-1/aaa/aaa-22222222",
            name: "aaa-22222222",
            folders: [],
            files: []
          }
        ],
        files: []
      },
      {
        path: "/folder-1/bbb",
        name: "bbb",
        folders: [
          {
            path: "/folder-1/bbb/bbb-111111111",
            name: "bbb-111111111",
            folders: [],
            files: [
              {
                name: "5jddx4.jpg",
                path: "/5jddx4.jpg"
              }
            ]
          }
        ],
        files: [
          {
            name: "JgRq0P.webp",
            path: "/JgRq0P.webp"
          }
        ]
      }
    ],
    files: [
      {
        name: "JgYq12.webp",
        path: "/JgYq12.webp"
      },
      {
        name: "JgY95X.webp",
        path: "/JgY95X.webp"
      }
    ]
  },
  {
    path: "/folder-2",
    name: "folder-2",
    folders: [
    ],
    files: [
      {
        name: "HGJ5yNt.jpg",
        path: "/HGJ5yNt.jpg"
      },
      {
        name: "HGJWyOb.jpg",
        path: "/HGJWyOb.jpg"
      },
      {
        name: "HGJXXr7.jpg",
        path: "/HGJXXr7.jpg"
      }
    ]
  }
]
