import { ServiceDetail } from "@/components/service-detail";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getService("lead-streamlining");

export const metadata = pageMetadata({
  title: service.label,
  description: service.intro,
  path: service.href,
});

export default function LeadStreamliningPage() {
  return <ServiceDetail service={service} />;
}
