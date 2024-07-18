import { Box, Card, CardContent, Typography } from '@mui/material';
import { useCards } from '../hooks/queries/useCards';

function Cards() {
  const { data: cards, isFetching } = useCards();

  return (
    <Box sx={{ m: 2 }}>
      {isFetching
        ? 'Loading cards...'
        : cards?.map((card) => (
            <Card key={card.id}>
              <CardContent>
                <Typography variant="h3">{card.title}</Typography>
                <Typography variant="body1">{card.content}</Typography>
              </CardContent>
            </Card>
          ))}
    </Box>
  );
}

export default Cards;
