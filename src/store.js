export const db = {
  todos: [
    { id: 1, title: "첫 할 일", done: false, userId: 1, createdAt: new Date().toISOString() }
  ],
  users: [{ id: 1, name: "Alice", email: "alice@example.com" }]
};

let seq = 2;
export const nextId = () => seq++;
