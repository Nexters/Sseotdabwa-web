import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl space-y-12">
        {/* Button Section */}
        <section>
          <h1 className="text-h2-bold text-gray-black mb-8">Button 컴포넌트</h1>

          <div className="space-y-8">
            {/* Variant */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">Variant</h2>
              <div className="flex items-center gap-4">
                <Button variant="filled">Filled</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            {/* Size */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">Size</h2>
              <div className="flex items-center gap-4">
                <Button size="large">Large</Button>
                <Button size="small">Small</Button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Button variant="outline" size="large">Large</Button>
                <Button variant="outline" size="small">Small</Button>
              </div>
            </div>

            {/* Rounded */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">Rounded</h2>
              <div className="flex items-center gap-4">
                <Button rounded={false}>Default</Button>
                <Button rounded>Rounded</Button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Button variant="outline" rounded={false}>Default</Button>
                <Button variant="outline" rounded>Rounded</Button>
              </div>
            </div>

            {/* FullWidth */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">FullWidth</h2>
              <div className="space-y-4">
                <Button fullWidth>FullWidth Filled</Button>
                <Button variant="outline" fullWidth>FullWidth Outline</Button>
              </div>
            </div>

            {/* Combinations */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">조합 예시</h2>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="small" rounded>Small Rounded</Button>
                <Button variant="outline" size="small" rounded>Outline Small Rounded</Button>
                <Button size="large" rounded>Large Rounded</Button>
                <Button variant="outline" size="large" rounded>Outline Large Rounded</Button>
              </div>
            </div>

            {/* Disabled */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">Disabled</h2>
              <div className="flex items-center gap-4">
                <Button disabled>Filled Disabled</Button>
                <Button variant="outline" disabled>Outline Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Icon Section */}
        <section>
          <h1 className="text-h2-bold text-gray-black mb-8">Icon 컴포넌트</h1>

          <div className="space-y-8">
            {/* All Icons */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">아이콘 목록</h2>
              <div className="grid grid-cols-5 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="noti" />
                  <span className="text-s5-medium text-gray-600">noti</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="noti-solid" />
                  <span className="text-s5-medium text-gray-600">noti-solid</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="plus" />
                  <span className="text-s5-medium text-gray-600">plus</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="cross" />
                  <span className="text-s5-medium text-gray-600">cross</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="right" />
                  <span className="text-s5-medium text-gray-600">right</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="left" />
                  <span className="text-s5-medium text-gray-600">left</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="down" />
                  <span className="text-s5-medium text-gray-600">down</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="dots-solid" />
                  <span className="text-s5-medium text-gray-600">dots-solid</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="vote-solid" />
                  <span className="text-s5-medium text-gray-600">vote-solid</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="checked-vote-solid" />
                  <span className="text-s5-medium text-gray-600">checked-vote-solid</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="camera-solid" />
                  <span className="text-s5-medium text-gray-600">camera-solid</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="krw" />
                  <span className="text-s5-medium text-gray-600">krw</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="my-solid" />
                  <span className="text-s5-medium text-gray-600">my-solid</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="product-solid" />
                  <span className="text-s5-medium text-gray-600">product-solid</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="circle-checked-solid" />
                  <span className="text-s5-medium text-gray-600">circle-checked-solid</span>
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">Size</h2>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="noti" size={16} />
                  <span className="text-s5-medium text-gray-600">16px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="noti" size={20} />
                  <span className="text-s5-medium text-gray-600">20px (기본)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="noti" size={24} />
                  <span className="text-s5-medium text-gray-600">24px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="noti" size={32} />
                  <span className="text-s5-medium text-gray-600">32px</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section>
          <h1 className="text-h2-bold text-gray-black mb-8">Tabs 컴포넌트</h1>

          <div className="space-y-8">
            {/* Line Variant (Default) */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">
                Line Variant (기본)
              </h2>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">전체</TabsTrigger>
                  <TabsTrigger value="tab2">진행중</TabsTrigger>
                  <TabsTrigger value="tab3">완료</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">
                      전체 탭 콘텐츠입니다.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">
                      진행중 탭 콘텐츠입니다.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">
                      완료 탭 콘텐츠입니다.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Multiple Tabs Example */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">여러 탭 예시</h2>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">개요</TabsTrigger>
                  <TabsTrigger value="analytics">분석</TabsTrigger>
                  <TabsTrigger value="reports">리포트</TabsTrigger>
                  <TabsTrigger value="settings">설정</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">개요 콘텐츠</p>
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">분석 콘텐츠</p>
                  </div>
                </TabsContent>
                <TabsContent value="reports">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">
                      리포트 콘텐츠
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">설정 콘텐츠</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Disabled Tab Example */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-t1-bold text-gray-900 mb-4">비활성화 탭</h2>
              <Tabs defaultValue="active">
                <TabsList>
                  <TabsTrigger value="active">활성화</TabsTrigger>
                  <TabsTrigger value="disabled" disabled>
                    비활성화
                  </TabsTrigger>
                  <TabsTrigger value="another">다른 탭</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">
                      활성화된 탭 콘텐츠
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="another">
                  <div className="rounded-md bg-gray-100 p-4">
                    <p className="text-b2-medium text-gray-800">
                      다른 탭 콘텐츠
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
