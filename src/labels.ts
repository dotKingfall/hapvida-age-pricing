//AppBar
export const appbar_last_updated = "Maio/2025"
export const appbar_title = "ORÇAMENTO EDITÁVEL SP" 

//Drawer
export const drawer_title = "CONFIGURAÇÕES"
export const drawer_apply_discount = "APLICAR OUTRO DESCONTO"
export const drawer_override_base_discount = "ALTERAR DESCONTO BASE"
export const drawer_show_age_range = "SUBSTITUIR IDADE POR FAIXA ETÁRIA"
export const drawer_discount_duration = "DURAÇÃO DO DESCONTO EM MESES";
export const drawer_customize_output = "MUDAR FORMATAÇÃO DO TEXTO"

//TextInput
export const textinput_age_label = "Idades"
export const textinput_separate_by_blank_space = "*As idades devem ser separadas por espaço"
//--Error
export const textinput_intspace_rule = "Digite apenas números inteiros e espaços"
export const textinput_maxage_rule = "Este plano não está disponível para pessoas com 50 anos ou mais"

//Plans
export const plan_label = "Selecionar Plano"
export const plan_names = [
  "Notrelife",
  "Notrelife 50+",
  "Nosso Médico Individual",
  "Nosso Médico Empresarial",
  "Smart 200", // 2
  "Smart 200 Up", // 2
];

//ReferenceLabel
export const referencelabel_title = "REFERÊNCIA: "
export const referencelabel_plan_names = [
  ["Notrelife Individual", "Notrelife Familiar"],
  ["Notrelife 50+ Individual", "Notrelife 50+ Familiar"],
  ["Nosso Médico Individual (1 Vida)", "Nosso Médico Individual (2+ Vidas)"],
  ["Nosso Médico Empresarial (1 Vida)", "Nosso Médico Empresarial (2+ Vidas)"],
  ["Smart 200 (1 Vida)", "Smart 200 (2+ Vidas)"],
  ["Smart 200 Up (1 Vida)", "Smart 200 Up (2+ Vidas)"],
]

//PricingTables
export const pricingtables_coparticipation_title = "COM COPARTICIPAÇÃO"
export const pricingtables_nocoparticipation_title = "SEM COPARTICIPAÇÃO"
export const pricingtables_enf_title = "ENFERMARIA"
export const pricingtables_amb_title = "AMBULATORIAL"
export const pricingtables_apt_title = "APARTAMENTO"

//OutputConfig
export const outputconfig_change_price_value = "{label}: {price}"
export const outputconfig_change_total_value = "Total: {total}"
export const outputconfig_change_discount_price_value = "Total com desconto: {discountedTotal} (-{discount}%)"
export const outputconfig_change_discount_value = "Total após {duration} meses: {discountedTotal} (-{discount}%)"
export const outputconfig_change_discount_duration_value = "Após {duration} meses, os valores retornarão ao normal."

export const outputconfig_change_price_label = "Alterar mensagem Idade: Preço"
export const outputconfig_change_total_label = "Alterar mensagem Total: Preço"
export const outputconfig_change_discount_price_label = "Alterar mensagem Total: Preço (com desconto)"
export const outputconfig_change_discount_label = "Alterar mensagem Desconto: Porcentagem"
export const outputconfig_change_discount_duration_label = "Alterar mensagem Duração: Meses"

export const outputconfig_change_price_hint = "Use {label} para a idade/faixa etária e {price} para o preço."
export const outputconfig_change_total_hint = "Use {total} para o preço total."
export const outputconfig_change_discount_price_hint = "Use {discountedTotal} para o preço total com desconto."
export const outputconfig_change_discount_hint = "Use {discount} para o valor do desconto."
export const outputconfig_change_discount_duration_hint = "Use {duration} para a duração do desconto em meses."