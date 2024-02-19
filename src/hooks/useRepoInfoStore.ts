import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import repoApi from "../api/repoApi";
import {
  onLoadCardsInfo,
  onLoadCpuReports,
  onLoadNotificacions,
  onLoadReportCommits,
  onLoadTodos,
  onRepoInfoInitLoading,
} from "../store";

export const useRepoInfoStore = () => {
  const {
    notifications,
    todos,
    cardsInfo,
    cpuReports,
    reportCommits,
    isLoading,
  } = useAppSelector((state) => state.repoInfo);

  const dispatch = useAppDispatch();

  const startLoadingNotification = async () => {
    dispatch(onRepoInfoInitLoading());

    try {
      const { data } = await repoApi.get("notification");
      dispatch(onLoadNotificacions(data));
    } catch (error) {
      console.log("error loading Notificacion ", error);
      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  const startLoadingTodos = async () => {
    dispatch(onRepoInfoInitLoading());

    try {
      const { data } = await repoApi.get("todos");
      dispatch(onLoadTodos(data));
    } catch (error) {
      console.log("error loading Todos ", error);

      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  const startLoadingCardsInfos = async () => {
    dispatch(onRepoInfoInitLoading());

    try {
      const { data } = await repoApi.get("dashboard_cards");
      dispatch(onLoadCardsInfo(data));
    } catch (error) {
      console.log("error loading Cards ", error);

      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  const startLoadingCpuReports = async () => {
    dispatch(onRepoInfoInitLoading());

    try {
      const { data } = await repoApi.get("cpu_report");
      dispatch(onLoadCpuReports(data));
    } catch (error) {
      console.log("error loading Cpu Reports ", error);

      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  const startLoadingReportCommits = async () => {
    dispatch(onRepoInfoInitLoading());

    try {
      const { data } = await repoApi.get("report_commits");

      dispatch(onLoadReportCommits(data));
    } catch (error) {
      console.log("error loading Report Commits ", error);

      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  return {
    startLoadingNotification,
    startLoadingTodos,
    startLoadingCardsInfos,
    startLoadingCpuReports,
    startLoadingReportCommits,

    notifications,
    todos,
    cardsInfo,
    cpuReports,
    reportCommits,

    isLoading,
  };
};
