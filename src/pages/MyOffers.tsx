import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OfferCard } from '@/components/OfferCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Plus } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  tags: string[] | null;
  created_at: string;
  user_id: string;
  users?: {
    full_name: string;
    email: string;
  };
}

export default function MyOffers() {
  const { user } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyOffers();
    }
  }, [user]);

  const fetchMyOffers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('offers')
        .select(`
          *,
          users (
            full_name,
            email
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching my offers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading your offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Offers</h1>
          <p className="text-muted-foreground">Manage your active offers and requests</p>
        </div>
        <Link to="/create-offer">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Offer
          </Button>
        </Link>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">No offers yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by creating your first offer or request to begin exchanging with others.
            </p>
            <Link to="/create-offer">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Offer
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              showRequestButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}