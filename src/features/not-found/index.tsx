import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-ait-h2-bold text-ait-neutral-900">
          Product Not Found
        </h2>
        <p className="text-ait-body-lg-regular text-ait-neutral-600">
          The product you are looking for might have been removed or doesn't
          exist.
        </p>
      </div>
      <Button
        variant="primary"
        onClick={() => navigate('/product')}
        className="inline-flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Products
      </Button>
    </div>
  );
}
