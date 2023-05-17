import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material/styles";
import { useGetFeedBacksQuery } from "../../state/api";
import { Typography } from "@mui/material";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { Rating } from "@mui/material";
import {useMediaQuery} from "@mui/material";

const FeedBack = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  participants,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
      <Card
          sx={{
              backgroundImage: "none",
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
          }}
      >
          <CardContent>
              <Typography
                  sx={{ fontSize: 14 }}
                  color={theme.palette.secondary[700]}
                  gutterBottom
              >
                  {category}
              </Typography>
              <Typography variant="h5" component="div">
                  {name}
              </Typography>
              
              <Rating value={rating} readOnly />

              <Typography variant="body2">{description}</Typography>
          </CardContent>
          <CardActions>
              <Button
                  variant="primary"
                  size="small"
                  onClick={() => setIsExpanded(!isExpanded)}
              >
                  See More
              </Button>
          </CardActions>
          <Collapse
              in={isExpanded}
              timeout="auto"
              unmountOnExit
              sx={{
                  color: theme.palette.neutral[300],
              }}
          >
              <CardContent>
                  <Typography>id: {_id}</Typography>
              </CardContent>
          </Collapse>
      </Card>
  );
};

const FeedBacks = () => {
  const { data, isLoading } = useGetFeedBacksQuery();
  console.log("data", data);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
      <Box m="1.5rem 2.5rem">
          <Header title="FEEDBACKS" subtitle="See your list of feedBacks." />
          {data || !isLoading ? (
              <Box
                  mt="20px"
                  display="grid"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  justifyContent="space-between"
                  rowGap="20px"
                  columnGap="1.33%"
                  sx={{
                      "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                      },
                  }}
              >
                  {data.map(
                      ({
                          _id,
                          name,
                          description,
                          rating,
                          category,
                      }) => (
                          <FeedBack
                              key={_id}
                              _id={_id}
                              name={name}
                              description={description}
                              rating={rating}
                              category={category}
                          />
                      )
                  )}
              </Box>
          ) : (
              <>Loading...</>
          )}
      </Box>
  );
};

export default FeedBacks;