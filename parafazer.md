
export const empresa = {
  name: "VMA",
  valuation: 7209994.03,
  lucroLiquido: -3952.34,
  receitaLiquida: 31062.3,
  despesaBruta: 35014.64,
  socios: {
    qtd: 2,
    pessoas: PESSOA []
  },
  colaboradores: {
    qtd: 10,
    pessoas: PESSOA []
  }
};

PESSOA{
    NOME
    EMPRESA
    CARGO
    DESCRIÇAO
    EMAIL
    TELEFONE
}

export const vmaDataFaturamento = [
  {
    name: "Faturamento",
    data: [5571.38, 6243.48, 31062.30],
  },
  {
    name: "Despesas",
    data: [18745.46, 41920.67, 35014.64],
  },
];



export const vmaDataFaturamentoOption: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#39B8FF","#4318FF" ],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    enabled:true
  },
  dataLabels: {
    enabled: false,
    
  },
  stroke: {
    curve: "smooth",
    // type: "line",
  },
  xaxis: {
    // type: "numeric",
    categories: ["Jan", "Fev", "Mar"],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: true,
  },
  grid: {
    show: false,
    column: {
      // color: ["#7551FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  // color: ["#7551FF", "#39B8FF"],
};

export const vmaReceitaTable = [
  {
    name: "Receita Liquida",
    data: [5571.38, 6243.48, 31062.30],
  },
];

export const vmaReceitaTableOption: ApexGeneric = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["Jan", "Fev", "Mar", "Fev", "Mar", "Abr", "Mai"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "35px",
    },
  },
};

export const vmaFaturamentoLineTable = [
  {
    name: "Faturamento",
    data: [5571.38, 6243.48, 31062.30],
  },
];

export const lineChartOptionsTotalFaturamento: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#4318FF"],
  markers: {
    size: 10,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    // type: "line",
  },
  xaxis: {
    // type: "numeric",
    categories: ["Jan", "Fev", "Mar"],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
  legend: {
    show: false,
  },
  grid: {
    show: true,
    column: {
      // color: ["#7551FF", "#39B8FF"],
      opacity: 0.3,
    },
  },
  // color: ["#7551FF", "#39B8FF"],
};

export const despesasVMAline = [
  {
    name: "Despesas",
    data: [18745.46, 41920.67, 35014.64],
  },
];


  
  
  export const vmaDespesaLineOption: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#ff0000",
      },
    },
    colors: ["#ff0000"],
    markers: {
      size: 10,
      colors: "white",
      strokeColors: "#ff0000",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      // type: "line",
    },
    xaxis: {
      // type: "numeric",
      categories: ["Jan", "Fev", "Mar"],
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      column: {
        // color: ["#7551FF", "#39B8FF"],
        opacity: 0.3,
      },
    },
    // color: ["#7551FF", "#39B8FF"],
  };
  