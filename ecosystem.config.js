module.exports = {
  apps: [
    {
      name: "vgt-usa-dashboard-api",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      port: 36102,
      watch: true
    }
  ]
};
