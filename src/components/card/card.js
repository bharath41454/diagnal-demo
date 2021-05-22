import React from "react";
import LazyLoad from "react-lazyload";
import { Card, CardImg, CardTitle } from "reactstrap";
import { host } from "../../config";
import placeholder_for_missing_posters from "../../static/placeholder_for_missing_posters.png";

const CardComponent = ({ name, imageName }) => {
  return (
    <div>
      <Card>
        <LazyLoad height={100}>
          <CardImg
            onError={(event) =>
              (event.target.src = placeholder_for_missing_posters)
            }
            top
            width='100%'
            src={`${
              imageName ? host + imageName : placeholder_for_missing_posters
            }`}
            alt={name}
          />
          <CardTitle tag='h6'>{name || "..."}</CardTitle>
        </LazyLoad>
      </Card>
    </div>
  );
};

export default CardComponent;
