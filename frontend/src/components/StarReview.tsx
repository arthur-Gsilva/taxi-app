import { IoMdStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

type Props = {
    rating: number
}

export const StarReview = ({ rating }: Props) => {

    if(rating > 5){rating = 5}
    if(rating < 0){rating = 0}

    return(
        <div className="flex item-center gap-2">
            {Array.from({ length: rating }).map((_, index) => (
                <IoStar key={index} color="gold" size={24} />
            ))}
            {Array.from({ length: 5 - rating }).map((_, index) => (
                <IoMdStarOutline key={index} size={24} />
            ))}
        </div>
    )
}