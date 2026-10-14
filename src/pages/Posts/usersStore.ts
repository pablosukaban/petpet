import { defineStore } from "pinia";
import type { User } from "./types";

type State = {
  users: Array<User>;
  isLoading: boolean;
};

const usersUrl = "https://jsonplaceholder.typicode.com/users";

export const useUsersStore = defineStore("users", {
  state: (): State => {
    return {
      users: [],
      isLoading: false,
    };
  },
  getters: {
    getUserById(state) {
      return (userId: number) => state.users.find((user) => user.id === userId);
    },
  },
  actions: {
    async fetchUsers() {
      if (this.users.length || this.isLoading) {
        return;
      }
      this.isLoading = true;

      try {
        const response = await fetch(usersUrl);
        const newUsers = (await response.json()) as User[];

        this.setUsers(newUsers);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    setUsers(newUsers: Array<User>) {
      this.users = newUsers;
    },
  },
});
