import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { User, Calendar, Tag } from 'lucide-react';

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

interface OfferCardProps {
  offer: Offer;
  onRequestExchange?: (offer: Offer) => void;
  showRequestButton?: boolean;
}

export function OfferCard({ offer, onRequestExchange, showRequestButton = true }: OfferCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{offer.title}</CardTitle>
          <Badge variant={offer.type === 'offer' ? 'default' : 'secondary'}>
            {offer.type}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{offer.users?.full_name || offer.users?.email || 'Anonymous'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {offer.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4" />
            <Badge variant="outline">{offer.category}</Badge>
          </div>
          
          {offer.tags && offer.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {offer.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(offer.created_at), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
      
      {showRequestButton && onRequestExchange && (
        <CardFooter>
          <Button 
            onClick={() => onRequestExchange(offer)}
            className="w-full"
            size="sm"
          >
            Request Exchange
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}