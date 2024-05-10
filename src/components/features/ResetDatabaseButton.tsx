import { seedEntries } from '@/app/api/journalEntries';
import { Button } from "@/components/ui/button"

function ResetDatabaseButton() {
  const handleResetDatabase = async () => {
    try {
      console.log('Resetting database...');
      await seedEntries();
      window.location.reload();
      console.log('Database reset successfully');
    } catch (error) {
      console.error('Error resetting database:', error);
    }
  };

  return (
    <Button onClick={handleResetDatabase} className="bg-[#38B2AC] hover:bg-[#186A66] md:text-lg text-sm px-1 m-0 md:px-3">Reset Demo</Button>
  );
}

export default ResetDatabaseButton;