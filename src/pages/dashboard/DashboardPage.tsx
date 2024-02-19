import { useAuthStore, useRepoInfoStore } from "../../hooks";
import { Weather } from "../../components/weather";
import { useEffect } from "react";
import { Loader } from "../../components/loader";
import { LineChar } from "../../components/lineChar";
import { BarChar } from "../../components/barChar";

export const DashboardPage = () => {
  const {
    startLoadingCardsInfos,
    startLoadingCpuReports,
    startLoadingReportCommits,
    notifications,
    cardsInfo,
    cpuReports,
    reportCommits,

    isLoading,
  } = useRepoInfoStore();

  const { user } = useAuthStore();


  useEffect(() => {
    startLoadingCardsInfos();
    startLoadingCpuReports();
    startLoadingReportCommits();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-5 bg-blue-50">
      <div className="flex flex-col">
        <h1 className="font-semibold">Bienvenido {user.user} </h1>
        <p className="text-xs">
          Verifica tus alertas, posees {notifications.length} alertas sin leer!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="bg-white sm:mr-5">
          <Weather />
        </div>

        <div className="bg-white flex flex-col sm:flex-col mt-5 sm:mt-0">
          <div className=" flex flex-col sm:flex-row">
            <div className="bg-blue-400 rounded-lg px-3 sm:min-w-72 sm:mr-5 mb-5 sm:mb-0">
              <h1 className="text-white text-xs my-2">Proyectos Registados</h1>

              <p className="text-white font-medium text-xl">
                {cardsInfo.projects}
              </p>

              <p className="text-white text-xs mb-5">
                Ultimo proyecto registrado hace 15 dias
              </p>
            </div>

            <div className="bg-violet-600 rounded-lg px-3 sm:min-w-72">
              <h1 className="text-white text-xs my-2">
                Proyectos en Desarrollado
              </h1>

              <p className="text-white font-medium text-xl">
                {cardsInfo.projects_dev}
              </p>

              <p className="text-white text-xs mb-5">Total de avances 22.00%</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mt-5">
            <div className="bg-violet-400 rounded-lg px-3 sm:min-w-72 sm:mr-5 mb-5 sm:mb-0">
              <h1 className="text-white text-xs my-2">NC's sin resolver</h1>

              <p className="text-white font-medium text-xl">
                {cardsInfo.peding_nc}
              </p>

              <p className="text-white text-xs mb-5">
                Ultimo Nc registrada hace 1 dia
              </p>
            </div>

            <div className="bg-red-400 rounded-lg px-3 sm:min-w-72 sm:mr-5 mb-5 sm:mb-0">
              <h1 className="text-white text-xs my-2">Cantidad de Errores</h1>

              <p className="text-white font-medium text-xl">
                {cardsInfo.errors_deploy}
              </p>

              <p className="text-white text-xs mb-5">
                Ultimo error hace 2 horas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="bg-white max-w-96 mr-5 mb-5 p-5 sm:mb-0 ">
          <p className="font-medium">Detalles Del Servidor</p>
          <p className="text-xs">
            The total number of sessions within the date range. It is the period
            time a user is actively engaged with your website, page or app, etc
          </p>

          <div className="flex flex-row mt-5">
            <div className="mr-5">
              <p className="text-xs text-slate-400">Tiempo de Uso</p>
              <p className="font-medium">{cpuReports.percentaje_time}%</p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Proyectos Desplegados</p>
              <p className="font-medium">{cpuReports.deploys}</p>
            </div>
          </div>

          <div>
            <LineChar time={cpuReports.time} />
          </div>
        </div>

        <div className="bg-white p-5">
          <p className="font-medium">Reportes de Commits</p>
          <p className="text-xs">
            Total de commits realizados por cada mes diferenciado entre los tag
            de Ajustes(fix) y Caracteristicas(feat)
          </p>

          <div>
            < BarChar reportCommits={reportCommits}   />
          </div>
        </div>
      </div>
    </div>
  );
};
