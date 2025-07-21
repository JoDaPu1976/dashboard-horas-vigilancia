
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";
import data from "./data/resumenHoras2025.json";

export default function DashboardHoras() {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const [vigilanteSeleccionado, setVigilanteSeleccionado] = useState("Vigilante 1");

  const dataFiltrada = data.filter(row => row.Vigilante === vigilanteSeleccionado).map(row => ({
    mes: meses[row["Mes Num"] - 1],
    ...row
  }));

  const tiposHora = Object.keys(dataFiltrada[0] || {}).filter(k => !["Vigilante", "Mes Num", "mes"].includes(k));

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="Vigilante 1" onValueChange={setVigilanteSeleccionado}>
        <TabsList>
          <TabsTrigger value="Vigilante 1">Vigilante 1</TabsTrigger>
          <TabsTrigger value="Vigilante 2">Vigilante 2</TabsTrigger>
          <TabsTrigger value="Vigilante 3">Vigilante 3</TabsTrigger>
        </TabsList>
        <TabsContent value={vigilanteSeleccionado}>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Horas mensuales por tipo</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dataFiltrada} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {tiposHora.map(tipo => (
                    <Line key={tipo} type="monotone" dataKey={tipo} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
