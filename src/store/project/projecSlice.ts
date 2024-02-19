import { createSlice } from "@reduxjs/toolkit";

interface Project {
  id: number;
  project_name: string;
  repo_url: string;
  client: string;
  developers: string;
  ci: boolean;
  cd: boolean;
  frontend_tecnology: string;
  backend_tecnology: string;
  databases: string;
  errors_count: number;
  warning_count: number;
  deploy_count: number;
  percentage_completion: number;
  report_nc: number;
  status: string;
}

interface InitialState {
  projects: Project[];
  isLoading: boolean;
}

const initialState: InitialState = {
  projects: [],
  isLoading: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    onProjectInitLoading: (state) => {
      state.isLoading = true;
    },

    onLoadProjects: (state, { payload }) => {
      payload.forEach((project: Project) => {
        const exists = state.projects.some(
          (repoApi) => repoApi.id === project.id
        );

        if (!exists) {
          state.projects.push(project);
        }
      });
      state.isLoading = false;
    },

    onUpdateProject: (state, { payload }) => {
      state.projects = state.projects.map((project) => {
        if (project.id === payload.id) {
          return payload;
        }
      });

      state.isLoading = false;
    },

    onDeleteProject: (state, { payload }) => {
      state.projects = state.projects.filter(
        (project) => project.id !== payload.id
      );

      state.isLoading = false;
    },
  },
});

export const {
  onProjectInitLoading,
  onLoadProjects,
  onUpdateProject,
  onDeleteProject,
} = projectSlice.actions;
