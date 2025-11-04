import { cn } from "@/lib/utils";
import { Img } from "@/ui/Img";

const FeatureList = ({
  features,
  className,
}: {
  features?: Sanity.Feature[];
} & React.ComponentProps<"div">) => {
  if (!features?.length) return null;

  return (
    <div className={cn("grid gap-6 xl:grid-cols-2", className)}>
      {features?.map((feature, key) => (
        <div key={key} className="flex w-full gap-4 md:w-auto">
          <div>
            {/* <Icon icon={feature.icon} /> */}
            <Img image={feature.icon as Sanity.Image} width={32} height={32} />
          </div>
          <div className="flex-1">
            <h3 className="mb-4 text-xl font-bold">{feature.name}</h3>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
