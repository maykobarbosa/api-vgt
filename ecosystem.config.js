module.exports = {
  apps: [
    {
      name: "vgt-usa-dashboard-api",
      script: "npm",
      args: "start",
      instances: 1, // <-- Ajustado para 1 instância
      exec_mode: "fork", // <-- Modo fork para uma instância única
      port: 36102,
      watch: true
    }
  ]
};
