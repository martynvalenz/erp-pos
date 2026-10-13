export const START_YEAR = 1975;
export const BIRTH_YEAR = 1900;

export const months = (lang: "es" | "en") => {
  if (lang === "es") {
    return [
      {
        num: 1,
        name: "Enero",
        shortName: "Ene",
      },
      {
        num: 2,
        name: "Febrero",
        shortName: "Feb",
      },
      {
        num: 3,
        name: "Marzo",
        shortName: "Mar",
      },
      {
        num: 4,
        name: "Abril",
        shortName: "Abr",
      },
      {
        num: 5,
        name: "Mayo",
        shortName: "May",
      },
      {
        num: 6,
        name: "Junio",
        shortName: "Jun",
      },
      {
        num: 7,
        name: "Julio",
        shortName: "Jul",
      },
      {
        num: 8,
        name: "Agosto",
        shortName: "Ago",
      },
      {
        num: 9,
        name: "Septiembre",
        shortName: "Sep",
      },
      {
        num: 10,
        name: "Octubre",
        shortName: "Oct",
      },
      {
        num: 11,
        name: "Noviembre",
        shortName: "Nov",
      },
      {
        num: 12,
        name: "Diciembre",
        shortName: "Dic",
      },
    ];
  }

  return [
    {
      num: 1,
      name: "January",
      shortName: "Jan",
    },
    {
      num: 2,
      name: "February",
      shortName: "Feb",
    },
    {
      num: 3,
      name: "March",
      shortName: "Mar",
    },
    {
      num: 4,
      name: "April",
      shortName: "Apr",
    },
    {
      num: 5,
      name: "May",
      shortName: "May",
    },
    {
      num: 6,
      name: "June",
      shortName: "Jun",
    },
    {
      num: 7,
      name: "July",
      shortName: "Jul",
    },
    {
      num: 8,
      name: "August",
      shortName: "Aug",
    },
    {
      num: 9,
      name: "September",
      shortName: "Sep",
    },
    {
      num: 10,
      name: "October",
      shortName: "Oct",
    },
    {
      num: 11,
      name: "November",
      shortName: "Nov",
    },
    {
      num: 12,
      name: "December",
      shortName: "Dec",
    },
  ];
};
