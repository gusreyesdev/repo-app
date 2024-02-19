import { createSlice } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  type: string;
  details: string;
  time: string;
}

interface Todo {
  id: string;
  description: string;
  check: boolean;
  hide: boolean;
}

interface CardsInfo {
  projects: number;
  projects_dev: number;
  peding_nc: number;
  errors_deploy: number;
}

interface CpuReport {
  percentaje_time: number;
  deploys: number;
  time: [
    {
      time: string;
      value: number;
    }
  ];
}

interface ReportCommits {
  month: number;
  feat: number;
  fix: number;
}

interface InitialState {
  notifications: Notification[];
  todos: Todo[];
  cardsInfo: CardsInfo;
  cpuReports: CpuReport;
  reportCommits: ReportCommits[];
  isLoading: boolean;
}

const initialState: InitialState = {
  notifications: [],
  todos: [],
  cardsInfo: {
    projects: 0,
    projects_dev: 0,
    peding_nc: 0,
    errors_deploy: 0,
  },
  cpuReports: {
    percentaje_time: 0,
    deploys: 0,
    time: [
      {
        time: "",
        value: 0,
      },
    ],
  },
  reportCommits: [],
  isLoading: false,
};

export const repoInfoSlice = createSlice({
  name: "repoInfo",
  initialState,

  reducers: {
    onRepoInfoInitLoading: (state) => {
      state.isLoading = true;
    },

    onLoadNotificacions: (state, { payload }) => {
      payload.forEach((notificacion: Notification) => {
        const exists = state.notifications.some(
          (repoApi) => repoApi.id === notificacion.id
        );

        if (!exists) {
          state.notifications.push(notificacion);
        }
      });
      state.isLoading = false;
    },

    onLoadTodos: (state, { payload }) => {
      payload.forEach((todo: Todo) => {
        const exists = state.todos.some((repoApi) => repoApi.id === todo.id);

        if (!exists) {
          state.todos.push(todo);
        }
      });
      state.isLoading = false;
    },

    onLoadCardsInfo: (state, { payload }) => {
      state.cardsInfo = payload;
      state.isLoading = false;
    },

    onLoadCpuReports: (state, { payload }) => {
      state.cpuReports = payload;
      state.isLoading = false;
    },

    onLoadReportCommits: (state, { payload }) => {
      payload.forEach((report: ReportCommits) => {
        const exists = state.reportCommits.some(
          (repoApi) => repoApi.month === report.month
        );

        if (!exists) {
          state.reportCommits.push(report);
        }
      });

      state.isLoading = false;
    },
  },
});

export const {
  onLoadNotificacions,
  onLoadTodos,
  onLoadCardsInfo,
  onLoadCpuReports,
  onRepoInfoInitLoading,
  onLoadReportCommits,
} = repoInfoSlice.actions;
