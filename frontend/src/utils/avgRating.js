const calculateAvgRating = (feedback) => {
   if (!feedback || feedback.length === 0) {
     return { totalRating: 0, avgRating: 0 };
   }
   const totalRating = feedback.reduce((acc, { rate }) => acc + rate, 0);
   const avgRating = (totalRating / feedback.length).toFixed(1);
   return { totalRating, avgRating };
 };
 
 export default calculateAvgRating;
 