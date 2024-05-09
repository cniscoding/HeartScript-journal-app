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
    <Button onClick={handleResetDatabase} className="mx-1">Reset Database</Button>
  );
}

export default ResetDatabaseButton;