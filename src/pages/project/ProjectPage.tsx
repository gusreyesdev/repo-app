import { CheckIcon, EditIcon, EraserIcon, XIcon } from "lucide-react";
import { Loader } from "../../components/loader";
import { useAuthStore, useProjectStore } from "@/hooks";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProjectPage = () => {
  const { startLoadingProject, startDeleteProject, isLoading, projects } =
    useProjectStore();

  const { user } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    startLoadingProject();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader />
      </div>
    );
  }

  const handleEdit = (project: any) => {
    navigate("/dashboard/edit-project", { state: { project: project } });
  };

  
  const handleDelete = (project: any) => {
    startDeleteProject(project);
  };

  return (
    <div className="p-5">
      <div>
        <h1> Lista De Proyectos Registrados </h1>
      </div>

      <div className="bg-white">
        <table>
          <thead>
            <tr>
              <th className="p-2" scope="col">
                Proyecto
              </th>
              <th className="p-2" scope="col">
                Cliente
              </th>
              <th className="p-2" scope="col">
                Repositorio
              </th>
              <th className="" scope="col">
                Desarrolladores
              </th>
              <th className="p-2" scope="col">
                CI
              </th>
              <th className="p-2" scope="col">
                CD
              </th>
              <th className="" scope="col">
                Frontend
              </th>

              <th className="" scope="col">
                Backend
              </th>

              <th className="p-2" scope="col">
                DB
              </th>

              <th className="p-2" scope="col">
                Alertas
              </th>

              <th className="p-2" scope="col">
                Errores
              </th>

              <th className="p-2" scope="col">
                Cant. Despliegues
              </th>
              <th className="p-2" scope="col">
                Avances
              </th>
              <th className="p-2" scope="col">
                Reportes NC's
              </th>
              <th className="p-2" scope="col">
                Status
              </th>

              <th className="p-2" scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="text-center">{project.project_name}</td>

                <td className="text-center">{project.client}</td>
                <td className="text-center">{project.repo_url}</td>

                <td className="text-center flex">{project.developers}</td>

                <td className="text-center">
                  {project.ci ? <CheckIcon /> : <XIcon />}
                </td>

                <td className="text-center">
                  {project.cd ? <CheckIcon /> : <XIcon />}
                </td>

                <td className="text-center flex">
                  {project.backend_tecnology}
                </td>

                <td className="text-center">{project.databases}</td>

                <td className="text-center">{project.warning_count}</td>

                <td className="text-center">{project.errors_count}</td>

                <td className="text-center">{project.deploy_count}</td>

                <td className="text-center">
                  {project.percentage_completion}%
                </td>

                <td className="text-center">{project.report_nc}</td>

                <td className="text-center">{project.status}</td>

                {user.user === "admin" ? (
                  <td className="text-center">
                    <div className="flex flex-row">
                      <Button
                        onClick={() => handleEdit(project)}
                        variant="outline"
                        size="icon"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => handleDelete(project)}
                        variant="outline"
                        size="icon"
                      >
                        <EraserIcon />
                      </Button>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
