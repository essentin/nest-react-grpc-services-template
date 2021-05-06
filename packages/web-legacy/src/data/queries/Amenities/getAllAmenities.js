import CommonType from '../../types/Amenities/CommonType';
import { UserAmenities } from '../../../data/models';

const getAllAmenities = {

    type: CommonType,

    async resolve() {
        try {
            const results = await UserAmenities.findAll();
            return {
                status:results && results.length > 0 ? 200 : 400,
                errorMessage: results && results.length > 0 ? null : "No results found!",
                results: results && results.length > 0 ? results : null
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong!,' + error,
            };
        }
    }
};

export default getAllAmenities;