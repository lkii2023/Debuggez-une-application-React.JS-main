export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth() + 1]; // rajout de "+1" dans date.getMonth() est nécessaire car la méthode getMonth() retourne les mois de 0 à 11, où 0 représente janvier et 11 représente décembre. En ajoutant "+1", on corrige l'index du mois pour qu'il corresponde aux valeurs de 1 à 12
