
const useDateFormatter = () => {

  const formatDateForInput = (dateValue: string | Date | undefined): string | undefined => {
    if (!dateValue) return undefined;

    try {
      const date = new Date(dateValue);

      // Vérifie si date est valide
      if (isNaN(date.getTime())) return undefined;

      // Convertit en format yyyy-MM-dd
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error);
      return undefined;
    }
  };

  // Formatte les dates de début et de fin de l'école
  const formatSchoolDates = (schoolDetails: any): void => {
    if (!schoolDetails) return;

    if (schoolDetails.startDate) {
      schoolDetails.startDate = formatDateForInput(schoolDetails.startDate);
    }

    if (schoolDetails.projectedEndDate) {
      schoolDetails.projectedEndDate = formatDateForInput(schoolDetails.projectedEndDate);
    }
  };

  return {
    formatDateForInput,
    formatSchoolDates
  };
};

export default useDateFormatter;
