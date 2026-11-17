import { ServiceDetail } from "@/components/service-detail";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getService("local-visibility");

export const metadata = pageMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: service.href,
});

export default function LocalVisibilityPage() {
  return <ServiceDetail service={service} />;
}
