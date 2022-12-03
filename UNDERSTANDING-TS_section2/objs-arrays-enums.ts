// const person: {
//   name: string;
//   age: number;
// }
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: 'haruki',
//   age: 24,
//   hobbies: ['music', 'youtube'],
//   role: [2, 'author'],
// };

// const ADMIN = 0;
// const READ_ONLY=1;
// const AUTHOR = 2;

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "haruki",
  age: 24,
  hobbies: ["music", "youtube"],
  role: Role.ADMIN,
};

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
  console.log("読み取り専用ユーザ");
}
