// declare module "@root/greenlock-express" {
//   import { RequestHandler } from "express";

//   interface GreenlockInstance {
//     serve: (handler: RequestHandler) => void;
//   }

//   interface GreenlockConfig {
//     packageRoot: string;
//     configDir: string;
//     maintainerEmail: string;
//     staging?: boolean;
//     cluster?: boolean;
//   }

//   function create(config: GreenlockConfig): GreenlockInstance;

//   export default {
//     create,
//   };
// }
