import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fINRCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { id, name, description, isVeg, image, price, isAvailable } = product;
  const editUrl = `/dashboard/edit-product/${id}/${price}/${name}`;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {isAvailable && (
          <Label
            variant="filled"
            color={(isAvailable === 'false' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {isAvailable ? 'Available':'Not Available'}
          </Label>
        )}
        <ProductImgStyle alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={editUrl} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={"#00AB55"} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
                // textDecoration: 'line-through',
              }}
            >
              {description}
            </Typography>
            <br/>
            {fINRCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
