export type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  registration:number | undefined;
  type?: string;
};