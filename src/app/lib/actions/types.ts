// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    name?: string[];
    colour?: string[];
    main?: string[];
    limit?: string;
  };
  message?: string | null;
};
