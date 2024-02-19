import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import repoApi from "../api/repoApi";
import {
  onDeleteProject,
  onLoadProjects,
  onProjectInitLoading,
  onUpdateProject,
} from "@/store";

interface Project {
  name: string;
  url: string;
}

export const useProjectStore = () => {
  const { isLoading, projects } = useAppSelector((state) => state.project);

  const dispatch = useAppDispatch();

  const startLoadingProject = async () => {
    dispatch(onProjectInitLoading());

    try {
      const { data } = await repoApi.get("projects");
      dispatch(onLoadProjects(data));
    } catch (error) {
      console.log("error loading Projects ", error);
      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  const startEditProject = async ({ name, url }: Project, project: any) => {
    dispatch(onProjectInitLoading());

    try {
      await repoApi.patch(`projects/${project.id}/`, {
        project_name: name,
        repo_url: url,
      });

      dispatch(onUpdateProject({ ...project }));
    } catch (error) {
      console.log("error edit project ", error);

      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  const startDeleteProject = async (project: any) => {
    dispatch(onProjectInitLoading());

    try {
      await repoApi.delete(`projects/${project.id}/`);

      dispatch(onDeleteProject({ ...project }));
    } catch (error) {
      console.log("error delete project ", error);

      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  return {
    isLoading,
    projects,

    startLoadingProject,
    startEditProject,
    startDeleteProject,
  };
};
