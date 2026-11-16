import { ServiceDetail } from "@/components/service-detail";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getService("websites");

export const metadata = pageMetadata({
  title: service.label,
  description: service.intro,
  path: service.href,
});

export default function WebsitesPage() {
  return <ServiceDetail service={service} />;
}
